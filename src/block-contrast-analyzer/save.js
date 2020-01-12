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

const Save = ( props, className ) => {
	// Get theme color data.
	const themeColors = select( 'core/editor' ).getEditorSettings().colors;

	// Assign an empty array.
	let colorPairs = [];

	// Loop through theme color palette.
	for ( let i = 0; i < themeColors.length - 1; i++ ) {
		colorPairs.push( themeColors[ i ] );
	}

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
}

export default Save;