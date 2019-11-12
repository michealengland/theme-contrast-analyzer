<?php
/**
 * Plugin Name: Theme Contrast Analyzer
 * Plugin URI:  https://github.com/michealengland/theme-contrast-analyzer
 * Description: Analyze theme color data for Gutenberg compatible themes.
 * Version:     0.0.1
 * Author:      Mike England
 * Author URI:  https://twitter.com/mikelikethebike
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: tca
 * Domain Path: /languages
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Enqueue files.
include_once( plugin_dir_path( __FILE__ ) . '/inc/enqueue-scripts.php' );
