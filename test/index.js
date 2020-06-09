import postcssPlugin from '../src/index.js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const expectHeader = '┏━━ Expect ━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'
const resultHeader = '┣━━ Result ━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫'
const closerHeader = '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'
const assertFormat = `\n\n${expectHeader}\n%s\n${resultHeader}\n%s\n${closerHeader}\n`

test({
	name: 'basic',
	message: 'will support basic usage'
})

test({
	name: 'basic',
	message: 'will support default { transformAtRules } option',
	pluginOptions: { transformAtRules: true }
})

test({
	name: 'basic',
	message: 'will support default { extensions } option',
	pluginOptions: { extensions: ['module.css'] }
})

test({
	name: 'basic',
	message: 'will support default { indexes } option',
	pluginOptions: { indexes: ['index.module.css'] }
})

test({
	name: 'basic',
	message: 'will support default { packageProps } option',
	pluginOptions: { packageProps: ['exports.icss.import', 'exports.icss.default', 'exports.icss'] }
})

test({
	name: 'will-support-double-quotes',
	message: 'will support double quotes in the import'
})

test({
	name: 'will-support-tilde',
	message: 'will support a tilde in the import'
})

test({
	name: 'will-support-unfound-import',
	message: 'will support an unfound import'
})

test({
	name: 'will-not-transform-composes-atrule',
	message: 'will not transform composes atrule with { transformAtRules: false } option',
	pluginOptions: { transformAtRules: false }
})

test({
	name: 'will-not-resolve-composes-declaration',
	message: 'will not resolve composes imports with { resolveImports: false } option',
	pluginOptions: { resolveImports: false }
})

function test({ name, message, pluginOptions }) {
	const sourceFile = resolve(`test/${name}.source.css`)
	const expectFile = resolve(`test/${name}.expect.css`)
	const resultFile = resolve(`test/${name}.result.css`)

	console.log(message)

	const sourceIcss = readFileSync(sourceFile, 'utf8')
	const expectIcss = readFileSync(expectFile, 'utf8')
	const resultIcss = postcssPlugin.process(sourceIcss, { from: sourceFile, to: sourceFile }, pluginOptions).css

	writeFileSync(resultFile, resultIcss)

	console.assert(expectIcss === resultIcss, assertFormat, expectIcss, resultIcss)
}
