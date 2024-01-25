<script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/wow.min.js"></script>
    <script src="assets/js/tiny-slider.js"></script>
    <script src="assets/js/glightbox.min.js"></script>
    <script src="assets/js/main.js"></script>

    <script src='https://www.google.com/recaptcha/api.js'></script>
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous">
    </script>
    
<script>
    
$('#desti-content').hide();

$('#show-more-desti').click(function(){
	$('#desti-content').show(300);
	$('#show-less-desti').show();
	$('#show-more-desti').hide();
});

$('#show-less-desti').click(function(){
	$('#desti-content').hide(150);
	$('#show-more-desti').show();
	$(this).hide();
});
    
$('#host-content').hide();

$('#show-more-host').click(function(){
	$('#host-content').show(300);
	$('#show-less-host').show();
	$('#show-more-host').hide();
});

$('#show-less-host').click(function(){
	$('#host-content').hide(150);
	$('#show-more-host').show();
	$(this).hide();
});
$('#host-content-one').hide();

$('#show-more-host-one').click(function(){
	$('#host-content-one').show(300);
	$('#show-less-host-one').show();
	$('#show-more-host-one').hide();
});

$('#show-less-host-one').click(function(){
	$('#host-content-one').hide(150);
	$('#show-more-host-one').show();
	$(this).hide();
});


$('#host-content1').hide();

$('#show-more-host1').click(function(){
	$('#host-content1').show(300);
	$('#show-less-host1').show();
	$('#show-more-host1').hide();
});

$('#show-less-host1').click(function(){
	$('#host-content1').hide(150);
	$('#show-more-host1').show();
	$(this).hide();
});
    
</script>    
 <script type="text/javascript">
        //========= Category Slider 
        tns({
            container: '.category-slider',
            items: 3,
            slideBy: 'page',
            autoplay: false,
            mouseDrag: true,
            gutter: 0,
            nav: false,
            controls: true,
            controlsText: ['<i class="lni lni-chevron-left"></i>', '<i class="lni lni-chevron-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                },
                540: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
                1170: {
                    items: 4,
                }
            }
        });
        tns({
            container: '.review-slider',
            items: 4,
            slideBy: 'page',
            autoplay: true,
            mouseDrag: true,
            gutter: 0,
            nav: false,
            controls: true,
            controlsText: ['<i class="lni lni-chevron-left"></i>', '<i class="lni lni-chevron-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                },
                540: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 2,
                },
                1170: {
                    items: 2,
                }
            }
        });
   
    </script>
    <script type="text/javascript">
        var activeNavItem = $('.nav-item');

activeNavItem.click(function(){
  activeNavItem.removeClass('active');
  $(this).addClass('active');  
});
    </script>