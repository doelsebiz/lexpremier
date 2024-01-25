<!doctype html>
<html lang="en-US">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
	 
     <title>Lex Premire Advocates & Consultants</title>
	  <meta name="description" content="Aeraki is one of the best hotels in Manali Himachal Pradesh. We offer the best hotels in Manali for families. Book luxurious rooms with modern amenities in the best hotels in Manali for Family.">
	  <meta name="keywords" content="Best Hotels in Manali, Hotels in Manali Himachal Pradesh, Best Hotels in Manali for Family">
      <link href="css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="css/menu.css"/>
      <link rel="stylesheet" type="text/css" href="css/owl.carousel.css"/>
      <link rel="stylesheet" type="text/css" href="css/style.css?s"/>
      <link rel="stylesheet" type="text/css" href="css/media.css"/>
      <link rel="stylesheet" type="text/css" href="css/animate.min.css"/>
      <link rel="stylesheet" type="text/css" href="js/parsley.css"/>
      <link rel="stylesheet" href="css/magnific-popup.css" />
      <link rel="stylesheet" href="css/font-awesome.min.css">
      <link rel="stylesheet" href="js/datepicker-master/datepicker.min.css">
      <link rel="stylesheet" type="text/css" href="js/parsley.css"/>
      <link rel="stylesheet" href="css/font-awesome.min.css">

      <script src="js/jquery-2.1.4.js"></script>
      <!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-PGEVD3HJR0"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', 'G-PGEVD3HJR0');
		</script>
   </head>

    
<?php include'include/header.php';?>
	  
	  <section class="inner-banner room-banner">
		<div class="container">
			<h2>Partners </h2>
		</div>
	  </section>
	  
	  <section class="inner-main-sec">
			
<div class="room-sec wow fadeInUp" style="visibility: visible; animation-name: fadeInUp">
   <div class="container">
      <div class="row rooms-heading">
         <div class="col-md-12 col-sm-12">
   <div class="homepartnersleft">
         <div class="homepartners">
         <div class="homepartners-img"> </div>
         <h6>Aditya Gautam </h6>
         <p>B.Tech , LLB , PGDCL </p>
         </div>

             <div class="homepartners">
         <div class="homepartners-img"> </div>
         <h6>Yogesh Vashista</h6>
         <p>B.Tech , LLB , LLM</p>
         </div>
  <div class="homepartners">
         <div class="homepartners-img"> </div>
         <h6>Abhishek Vashista</h6>
         <p>B.E. , LLB</p>
         </div>

            <div class="homepartners">
         <div class="homepartners-img"> </div>
         <h6>Shuchi Sodhi </h6>
         <p>B.A. , LLB (Hons) </p>
         </div> 

         
         <div class="homepartners">
         <div class="homepartners-img"> </div>
         <h6>Abhijit Deshmukh </h6>
         <p>B.E. , LLB (Hons) </p>
         </div> 

         </div>
         </div>
      </div>
    
   </div>
</div>
				
	  </section>  
      

<?php include'include/footer.php';?>
	  <script src="js/bootstrap.min.js"></script>
	  <script src="js/wow.js"></script>
     <script src="js/parsley.js"></script>

	  	 	
	  <script src="js/modernizr.min.js"></script>
		<script src="js/isotope.pkgd.js"></script>
		<script src="js/jquery.magnific-popup.js"></script>
   <script src="js/datepicker-master/datepicker.min.js"></script>
      <script src="js/parsley.js"></script>
	  
	
	
	  <script src="js/owl.carousel.js"></script>				 
	  <script>			
		$(document).ready(function() {		
				$(document).on("scroll", function(){
					if
				  ($(document).scrollTop() > 1){
					  $("header").addClass("shrink");
					}
					else
					{
						$("header").removeClass("shrink");
					}
				});
			
			$("#roo1-demo").owlCarousel({
				nav: false, 					
				slideSpeed : 3000,						
				paginationSpeed : 400,				
				autoplay:true,		 					  	
				autoplayTimeout:6000,					
				loop:true,					
				items: 1,
				animateIn: 'fadeIn', // add this
				animateOut: 'fadeOut' // and this
			});
			
			$("#roo3-demo").owlCarousel({
				nav: false, 					
				slideSpeed : 3000,				
				navText: ["<img src='images/ar-long-lft.svg'>","<img src='images/ar-long-rgt.svg'>"],
				paginationSpeed : 400,				
				autoplay:true,		 					  	
				autoplayTimeout:6000,					
				loop:true,					
				items: 1,
				animateIn: 'fadeIn', 
				animateOut: 'fadeOut'
			});
			
			$('.portfolio-menu li').click(function(){
         	$('.portfolio-menu li').removeClass('active');
         	$(this).addClass('active');
         	
         	var selector = $(this).attr('data-filter');
         	$('.portfolio-item').isotope({
         		filter:selector
         	});
         	return  false;
         });
       
		 var popup_btn = $('.popup-btn');
			 popup_btn.magnificPopup({
			 type : 'image',
			 gallery : {
				enabled : true
			 }
		 });
		 
		 wow = new WOW(
		  {
			animateClass: 'animated',
			offset:       100,
			callback:     function(box) {
			  console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
			}
		  }
		);
		wow.init();   
      

      $('#sendContact').on('submit',function(e) {
         $("#mail-status").html('');
         e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
         $("#form_submit").attr("disabled", true);
         if ( $(this).parsley().isValid() ) {
            $('.contact-submit').addClass('loading');
            $('.fa-circle-o-notch').removeClass('hidden');
            jQuery.ajax({
               url: "email.php",
               data: $('#sendContact').serialize(),
               type: "POST",
               success:function(data){
                  $("#mail-status").html(data);
                  $('.contact-submit').removeClass('loading');
                  $("#form_submit").attr("disabled", false);
				  $('.fa-circle-o-notch').addClass('hidden');
				  $("#sendContact").reset();

               },
               error:function (){
                  $('.contact-submit').removeClass('loading');
                  $("#form_submit").attr("disabled", false);
               $('.fa-circle-o-notch').addClass('hidden');
               }
            });
         }
      });   
          
	});
		$('[data-toggle="datepicker"]').datepicker({
			startDate: new Date(),
			format: 'dd-mm-yyyy',
			autoHide:true
		});
	</script>     
	
	<script src="js/menu.js"></script>
</body>
</html>

