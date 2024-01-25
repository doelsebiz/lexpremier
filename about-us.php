<!doctype html>
<html lang="en-US">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
	 
      <title>Lex Premier Advocates & Consultants</title>
      <link href="css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="css/menu.css"/>
      <link rel="stylesheet" type="text/css" href="css/owl.carousel.css"/>
      <link rel="stylesheet" type="text/css" href="css/style.css?s"/>
      <link rel="stylesheet" type="text/css" href="css/media.css"/>
      <link rel="stylesheet" type="text/css" href="css/animate.min.css"/>
      <link rel="stylesheet" type="text/css" href="js/parsley.css"/>
      <link rel="stylesheet" href="css/magnific-popup.css" />
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
<?php include 'include/header.php'; ?>
	  
	  
	  <section class="inner-banner about-banner-in">
		<div class="container">
			<h2>About US </h2>
		</div>
	  </section>
	  
	  <section class="about-banner">
		 <div class="container">
			<div class="about-left">
				<h2>Welcome to 
				Lex Premier Advocates & Consultants </h2>
			</div>
			<div class="about-right">
			<p>We at Lex Premier, take pride in the fact that we have the proven expertise in providing quality and timely solutions to Legal services Worldwide.</p>
			<p>Business and Law are inseparable twins. We Partner with the Enterprise, and provide customised solutions based on its needs and our Services are so designed that the Entrepreneur focuses on the core activity of adding value to the Enterprise, and we take care of its Legal matters.</p>
			<p>We derive our strength from our strong research-oriented approach, setting up processes in servicing backed with maximum exploitation of modern technology, as we march ahead in providing our Services.</p>


			</div>
		 </div>
	  </section>
	  
	  <section class="about-room-sec">
			<div class="container">
				<div class="about-room-outer">
					<div class="about-room-left">
						<figure><img src="images/about1.jpg" alt=""></figure>
					</div>
					<div class="about-room-right">
					
						<h4>Why we are unique</h4>
							
						<p>With a keen focus on learning and specialised practices, we keep in touch with the changing environment in which our clients operate. We take pride in combining the expertise and diversity of experience of a large firm with the personalized attention and responsiveness of a boutique firm. Our lawyers work seamlessly across practice areas and offices to assist our clients.</p>
							

<h4>Our Commitment</h4>
							
<p>Through our commitment to social responsibility, we serve our communities by rendering “pro bono” legal services and supporting social responsibility initiatives. The firm has committed to achieve an average of sixty pro bono hours per attorney per year. Our work in the pro-bono space extends to assisting on formulation of community sensitive and meaningful policies, laws and legal frameworks to facilitate economic and social development at the national, regional, city and neighbourhood levels.</p>

	
					</div>
				</div>
			</div>
	  </section>
	  
	  <section class="about-room-sec bg-white">
			<div class="container">
				<div class="about-room-outer revers">
					<div class="about-room-left">
						<figure><img src="images/about2.jpg" alt=""></figure>
					</div>
					<div class="about-room-right">

						<h4>We walk the talk</h4>
<p>Lex Premier’s vision to be the finest Indian law firm is strengthened by our core values: exceed client expectations; integrity in whatever we do; belief that “people matter”; an understanding that we best serve our clients with teamwork and collaboration; and that the beauty of our profession is constant learning. We honour and pursue diversity. We invest in our attorneys with focused continuing legal education and training in industry related issues and soft skills.</p>

	
						<h4>Client Focus </h4>
								<p>We serve our clients through partner-led teams with domain knowledge across twenty sectors: Agriculture & Forestry, Banking & Financial Services, Capital Markets & Securities, Construction and Engineering, Defence & Internal Security, Education, Energy – Power & Hydrocarbon, Hospitality, Tourism & Retail, Insurance & Pension, Investment funds and Asset Management, Life Sciences, Healthcare and Pharma, Manufacturing, Mines & Minerals, Non-Governmental Sector, Real Estate, Services, Technology, Media & Sports, Telecommunications & Broadcasting, Transport & Logistics and Urban Infrastructure, Smart Cities and Public Procurement.</p>
					</div>
				</div>
			</div>
	  </section>
	  

      

<?php include 'include/footer.php';?>
	  <script src="js/bootstrap.min.js"></script>
	  <script src="js/wow.js"></script>
     <script src="js/parsley.js"></script>
        
	  	 	
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>  
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js"></script>
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
			
			$("#owl-demo").owlCarousel({
   			nav: false, 					
   			slideSpeed : 3000,				
   			navText: ["<img src='images/ar-long-lft.svg'>","<img src='images/ar-long-rgt.svg'>"],
   			paginationSpeed : 400,				
   			autoplay:true,		 					  	
   			autoplayTimeout:6000,					
   			loop:true,					
   			items: 3,					
   			margin:30,				
   			responsiveClass:true,			
   			responsive:{			
      			0:{					
      				items:1,		
      				margin:0				
      			},					
      			480:{			
      				items:2,		
      				margin:10		
      			},			
      			991:{			
      				items:3			
      			}				
      		}				
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
	</script>     
	
	<script src="js/menu.js"></script>			 
</body>
</html>

