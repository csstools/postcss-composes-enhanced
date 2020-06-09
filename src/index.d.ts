import * as postcss from 'postcss'

/** Enhance the composes behavior in CSS Modules. */
export interface Plugin extends postcss.Plugin<PluginOptions> {}

export interface PluginOptions {
	/** Whether imports within `composes` declarations should be resolved. */
	resolveImports: boolean

	/** Whether `@composes` at-rules should be transformed into declarations. */
	transformAtRules: boolean
}

export default Plugin
