<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package minterest
 */

?>

			</div><!--.l-row-->
		</div><!--.inner-->
	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="l-container">
			<div class="site-info">
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'minterest' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'minterest' ), 'WordPress' ); ?></a>
				<span class="sep"> | </span>
				<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'minterest' ), 'minterest', '<a href="http://minterest.site/" rel="designer">minterest</a>' ); ?>
			</div><!-- .site-info -->
		</div><!-- .container -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
