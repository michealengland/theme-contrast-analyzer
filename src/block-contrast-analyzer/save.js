/**
 * Internal dependencies.
 */
import ThemeSwatchAnalyze from './swatch-contrast';

const Save = ( props ) => {
	const {
		attributes: {
			colorData,
		},
		className,
	} = props;

	// Copy theme color data for pairing.
	let colorPairs = [...colorData];

	return (
		<ul
			className={ className }
		>
			{ colorData.map( ( value, index ) => {
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