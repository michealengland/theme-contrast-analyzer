/**
 * Internal dependencies.
 */
import ThemeSwatchAnalyze from './swatch-contrast';

/**
 * WordPress Dependencies.
 */
const {
	data: {
		select,
	},
} = wp;

const updateSwatches = ( swatches ) => {
	// Get theme color data.
	const themeColors = select( 'core/editor' ).getEditorSettings().colors;

	swatches = swatches.splice(0, swatches.length, ...themeColors);

	return swatches;
}

const Save = ( props ) => {
	const {
		attributes: {
			swatches,
		},
		className,
	} = props;

	// updateSwatches( swatches );

	console.log('save swatches', swatches);

	/**
	 * This bug is caused by the save data not saving the correct
	 * color value data.
	 *
	 * I believe this is due to themeColors not calling data at the right time,
	 * or swatches is not being updated with the correct props even though it's
	 * correct in the console while testing.
	 */
	const myColorsTest = [
		{name: "Color 1", slug: "color-1", color: "#ff9900"},
		{name: "Color 2", slug: "color-2", color: "#0099cc"},
		{name: "Color 3", slug: "color-3", color: "#0066cc"},
	]

	// Copy theme color data for pairing.
	let colorPairs = [...myColorsTest];

	return (
		<div class="tca-block">
			<ul
				className={ className }
			>
				{ myColorsTest.map( ( value, index ) => {
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
		</div>
	);
}

export default Save;