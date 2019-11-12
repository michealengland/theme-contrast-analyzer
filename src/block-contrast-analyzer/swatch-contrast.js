/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import tinycolor from 'tinycolor2/tinycolor';

/**
 * Check the contrast ratings.
 *
 * @param {int} contrastValue
 */
function checkContrastRating( contrastValue ) {
	// Convert to integer.
	Math.abs( contrastValue );

	let contrastRating = '';

	// Assign a rating based on the values.
	switch( true ) {
		case ( contrastValue > 3 && contrastValue < 7 ) :
			contrastRating = 'AA';
			break;
		case ( contrastValue >= 7 ) :
			contrastRating = 'AAA';
			break;
		default :
			contrastRating = 'Poor Contrast';
	}

	return contrastRating;
}

function ThemeColorComparison( { swatchColorName, swatchPrimaryColor, swatchSecondaryColor, tinyBackgroundColor, tinyTextColor } ) {
	const swatchTitle = swatchColorName;
	const textAnalyzeColor = swatchPrimaryColor;
	const backgroundAnalyzeColor = swatchSecondaryColor;
	const contrastValue = tinycolor.readability( textAnalyzeColor, backgroundAnalyzeColor );
	const contrastClassName = ( contrastValue < 3 ) ? 'contrast-fail' : 'contrast-pass';

	const contrastLabel = Math.round( 100 * contrastValue ) / 100;

	// const a11yRating = contrastValue < 4.5 ? 'AA or Below' : 'AAA';
	const a11yRating = checkContrastRating( contrastValue );

	console.log( a11yRating );



	const comparisonNotification = tinyBackgroundColor.getBrightness() < tinyTextColor.getBrightness() ?
		__( 'Try using a darker background color and/or a brighter text color.' ) :
		__( 'Try using a brighter background color and/or a darker text color.' );

	return (
		<ul className="swatch-color">
			<li
				className={ 'color-demo' }
				style={ {
					color: textAnalyzeColor,
					backgroundColor: backgroundAnalyzeColor,
				} }
			>
				{ swatchTitle }
			</li>
			<li>{ comparisonNotification }</li>
			<li>{ 'contrast: ' + contrastLabel }</li>
			<li className={ contrastClassName }>{ a11yRating }</li>
		</ul>
	);
}

function ThemeSwatchAnalyze( {
	swatchColorName,
	swatchPrimaryColor,
	swatchSecondaryColor,
	fontSize, // font size value in pixels.
	isLargeText,
} ) {
	if ( ! swatchPrimaryColor || ! swatchSecondaryColor ) {
		return null;
	}

	const tinyBackgroundColor = tinycolor( swatchSecondaryColor );
	const tinyTextColor = tinycolor( swatchPrimaryColor );
	const hasTransparency = tinyBackgroundColor.getAlpha() !== 1 || tinyTextColor.getAlpha() !== 1;

	return (
		<ThemeColorComparison
			fontSize={ fontSize }
			isLargeText={ isLargeText }
			swatchColorName={ swatchColorName }
			swatchPrimaryColor={ swatchPrimaryColor }
			swatchSecondaryColor={ swatchSecondaryColor }
			tinyBackgroundColor={ tinyBackgroundColor }
			tinyTextColor={ tinyTextColor }
		/>
	);
}

export default ThemeSwatchAnalyze;
