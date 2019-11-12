/**
 * Internal dependencies
 */
import ThemeSwatchAnalyze from './swatch-contrast';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { select } = wp.data;

// Get theme color data.
const themeColors = select( 'core/editor' ).getEditorSettings().colors;

// Assign an empty array.
const colorPairs = [];

// Loop through theme color palette.
for ( let i = 0; i < themeColors.length - 1; i++ ) {
	colorPairs.push( themeColors[ i ] );
}

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
	edit: ( { className } ) => {
		return (
			<Fragment>
				<ul
					className={ className }
				>
					{ themeColors.map( ( value, index ) => {
						// Allow all non matching colors.
						const results = colorPairs.filter( ( pair ) => ( pair.slug ) !== value.slug );

						return (
							// Outputs a list of each theme color.
							<li
								className={ value.slug }
								key={ index }
							>
								<span
									className={ 'primary-color-label' }
								>
									{ value.name }
								</span>

								<ul className={ 'color-pairs' } >
									{ results.map( ( pair, key ) => {
										return (
											<li
												key={ key }
											>
												{ pair.name }
												<ThemeSwatchAnalyze
													{ ...{
														fontSize: 18,
														swatchColorName: pair.name,
														swatchPrimaryColor: value.color,
														swatchSecondaryColor: pair.color,
													} }
												/>
											</li>
										);
									} ) }
								</ul>
							</li>
						);
					} ) }
				</ul>
			</Fragment>
		);
	},
	save: ( { className } ) => {
		return (
			<ul
				className={ className }
			>
				{ themeColors.map( ( value, index ) => {
					// Create filtered array.
					const results = colorPairs.filter( ( pair ) => ( pair.slug ) !== value.slug );

					return (
						// Outputs a list of each theme color.
						<li
							className={ value.slug }
							key={ index }
						>
								<span
									className={ 'primary-color-label' }
								>
									{ 'Foreground: ' + value.name }
								</span>

							<ul
								className={ 'color-pairs' }
							>
								{ results.map( ( pair, key ) => {
									return (
										<li
											key={ key }
										>
											{ 'Background: ' + pair.name }
											<ThemeSwatchAnalyze
												{ ...{
													fontSize: 18,
													swatchColorName: pair.name,
													swatchPrimaryColor: value.color,
													swatchSecondaryColor: pair.color,
												} }
											/>
										</li>
									);
								} ) }
							</ul>
						</li>
					);
				} ) }
			</ul>
		);
	},
} );

