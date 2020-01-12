/**
 * Internal dependencies
 */
import ThemeSwatchAnalyze from './swatch-contrast';
import Edit from './edit';
import Save from './save';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { select } = wp.data;

registerBlockType( 'tca/swatch', {
	title: __( 'Theme Contrast Analyzer' ),
	description: __( 'Display registered swatches.' ),
	category: __( 'widgets' ),
	attributes: {
		swatches: {
			type: 'string',
			source: 'html',
			selector: 'div',
		},
	},
	Edit,
	Save,
} );

