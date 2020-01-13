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

const updateSwatches = ( swatches ) => {
	// Get theme color data.
	const themeColors = select( 'core/editor' ).getEditorSettings().colors;

	swatches = swatches.splice(0, swatches.length, ...themeColors);

	return swatches;
}

const Edit = ( props ) => {
	const {
		attributes: {
			swatches,
		},
		className,
	} = props;

	updateSwatches( swatches );

	console.log('edit swatches', swatches);

	// Copy theme color data for pairing.
	let colorPairs = [...swatches];

	return (
		<Fragment>
			<ul
				className={ className }
			>
				{ swatches.map( ( value, index ) => {
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