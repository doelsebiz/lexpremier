  <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
    
    <!-- Popper JS -->
    <script src="assets/js/popper.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="assets/js/bootstrap.min.js"></script>
    <!-- Meanmenu JS -->
    <script src="assets/js/jquery.meanmenu.js"></script>
    <!-- Wow JS -->
    <script src="assets/js/wow.min.js"></script>
    <!-- Owl Carousel JS -->
    <script src="assets/js/owl.carousel.js"></script>
    <!-- Owl Magnific JS -->
    <script src="assets/js/jquery.magnific-popup.min.js"></script>
    <!-- Nice Select JS -->
    <script src="assets/js/jquery.nice-select.min.js"></script>
    <!-- Parallax JS -->
    <script src="assets/js/parallax.min.js"></script>
    <!-- Mixitup JS -->
    <script src="assets/js/jquery.mixitup.min.js"></script>
    <!-- Appear JS -->
    <script src="assets/js/jquery.appear.js"></script>
    <!-- Odometer JS -->
    <script src="assets/js/odometer.min.js"></script>
    <!-- Form Ajaxchimp JS -->
    <script src="assets/js/jquery.ajaxchimp.min.js"></script>
    <!-- Form Validator JS -->
    <script src="assets/js/form-validator.min.js"></script>
    <!-- Contact JS -->
    <script src="assets/js/contact-form-script.js"></script>
    <!-- Custom JS -->
    <script src="assets/js/custom.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.5/slick.min.js"></script>
    <script>

$('.clients').slick({

 dots: false,

  prevArrow: $('.prev'),

  nextArrow: $('.next'),

  infinite: true,

  speed: 300,

  slidesToShow: 6,

  slidesToScroll: 6,

  responsive: [

    {

      breakpoint: 1024,

      settings: {

        slidesToShow: 5,

        slidesToScroll: 5,

        infinite: true,

        dots: false

      }

    },

    {

      breakpoint: 600,

      settings: {

        slidesToShow: 3,

        slidesToScroll: 3

      }

    },

    {

      breakpoint: 480,

      settings: {

        slidesToShow: 1,

        slidesToScroll: 1

      }

    }

    // You can unslick at a given breakpoint now by adding:

    // settings: "unslick"

    // instead of a settings object

  ]

});
</script>
 <script>
        var TxtRotate = function(el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = '';
          this.tick();
          this.isDeleting = false;
        };

        TxtRotate.prototype.tick = function() {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = '<span style="font-size:30px;" class="wrap">'+this.txt+'</span>';

          var that = this;
          var delta = 200 - Math.random() * 100;

          if (this.isDeleting) { delta /= 2; }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }

          setTimeout(function() {
            that.tick();
          }, delta);
        };

        window.onload = function() {
          var elements = document.getElementsByClassName('txt-rotate');
          for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
          }
          // INJECT CSS
          var css = document.createElement("style");
          css.type = "text/css";
          css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #fff }";
          document.body.appendChild(css);
        };
    </script>
    <script type="text/javascript">
      $(document).ready(function(){
  $('.carousel').slick({
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // dots:true,
    centerMode: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        // centerMode: true,

      }

    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        infinite: true,

      }
    },  {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
      }
    }]
  });
});
    </script>
    <script>
  function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}
</script>
<script type="text/javascript">
    var $element=$('.each-event, .title');
var $window = $(window);
$window.on('scroll resize', check_for_fade);
$window.trigger('scroll');
function check_for_fade() { 
    var window_height = $window.height();
    
    $.each($element, function (event) {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_offset = $element.offset().top;
        space = window_height - (element_height + element_offset -$(window).scrollTop());
        if (space < 60) {
            $element.addClass("non-focus");
        } else {
            $element.removeClass("non-focus");
        }
 
    });
};
</script>