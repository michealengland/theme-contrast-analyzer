/**
 * Internal dependencies.
 */
import edit from './edit';
import save from './save';

/**
 * WordPress Dependencies.
 */
const {
	blocks: {
		registerBlockType,
	},
	i18n: {
		__,
	},
} = wp;

registerBlockType( 'tca/swatch', {
	title: __( 'Theme Contrast Analyzer' ),
	description: __( 'Display registered swatches.' ),
	category: __( 'widgets' ),
	attributes: {
		swatches: {
			type: 'array',
			default: [],
			// source: 'html',
			// selector: 'div',
		},
	},
	edit,
	save,
} );

