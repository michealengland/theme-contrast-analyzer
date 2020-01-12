/**
 * Internal dependencies.
 */
import ThemeSwatchAnalyze from './swatch-contrast';

/**
 * WordPress Dependencies.
 */
const {
	element: {
		Fragment,
	},
	data: {
		select,
	},
} = wp;

const Edit = ( props, className ) => {
	// Get theme color data.
	const themeColors = select( 'core/editor' ).getEditorSettings().colors;

	// Assign an empty array.
	let colorPairs = [];

	// Loop through theme color palette.
	for ( let i = 0; i < themeColors.length - 1; i++ ) {
		colorPairs.push( themeColors[ i ] );
	}

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
}

export default Edit;