import path from 'path'
import postcss from 'postcss'
import { resolveSync } from 'css-import-resolve'

/** Enhance the composes behavior in CSS Modules. */
export default postcss.plugin('postcss-plugin-composes', function initializer(opts) {
	opts = Object(opts)

	opts.resolveImports = Boolean('resolveImports' in opts ? opts.resolveImports : true)
	opts.transformAtRules = Boolean('transformAtRules' in opts ? opts.transformAtRules : true)

	opts.extensions = [].concat('extensions' in opts ? opts.extensions : 'module.css')
	opts.indexes = [].concat('indexes' in opts ? opts.indexes : 'index.module.css')
	opts.packageProps = [].concat(
		'packageProps' in opts ? opts.packageProps : ['exports.icss.import', 'exports.icss.default', 'exports.icss']
	)

	return function transformer(css) {
		/** Directory of the current CSS file. */
		const cwd = path.dirname(css.source.input.file)

		css.walk(node => {
			// replace any "@composes" at-rule with a "composes" declaration
			if (opts.transformAtRules) {
				if (node.type === 'atrule' && node.name === 'composes') {
					node.replaceWith((node = postcss.decl({ prop: node.name, value: node.params })))
				}
			}

			// ignore any non-"composes" declaration
			if (!opts.resolveImports || node.type !== 'decl' || node.prop !== 'composes') return

			/** Matches of any declarations */
			const matches = node.value.match(matchImports)

			if (matches) {
				/** Whether this is a global "composes" value, which will be ignored. */
				const [, , , , , global] = matches

				// resolve the path of any non-global "composes"
				if (!global) {
					const originalValue = node.value
					const modifiedValue = getModifiedValue(originalValue, cwd, opts)

					if (originalValue !== modifiedValue) {
						node.value = modifiedValue
					}
				}
			}
		})
	}
})

/** RegExp used to match imports (from https://github.com/css-modules/postcss-modules-extract-imports/blob/2.0.0/src/index.js#L6) */
const matchImports = /^(.+?)(\s+from\s+)(?:"([^"]+)"|'([^']+)'|(global))$/

/**
 * Return the value of a composes declaration with any import paths resolved.
 * @arg {string} value
 * @arg {string} cwd
 * @arg {{ [key: string]: any }} opts
 */

function getModifiedValue(value, cwd, opts) {
	return value.replace(matchImports, ($0, symbols, fromPart, doubleQuotePath, singleQuotePath) => {
		const originalPath = doubleQuotePath || singleQuotePath
		const modifiedPath = cssResolve(originalPath, cwd, opts)
		const exportedPath = modifiedPath === originalPath ? originalPath : path.relative(cwd, modifiedPath)
		const quote = doubleQuotePath ? '"' : "'"

		return symbols + fromPart + quote + exportedPath + quote
	})
}

/**
 * Return a css-resolved path or the original path.
 * @arg {string} file
 * @arg {string} cwd
 * @arg {{ [key: string]: any }} opts
 */

function cssResolve(file, cwd, opts) {
	return (
		// use the node-resolve-able path
		resolveSync(withoutTilde(file), cwd, opts) || file
	)
}

/**
 * Return the filename without the starting tilde.
 * @arg {string} file
 */

function withoutTilde(file) {
	return file.replace(/^~/, '')
}
