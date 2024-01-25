<?php session_start() ?>
<!doctype html>
<html lang="en-US">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <title>Lex Premire Advocates & Consultants</title>
   <meta name="description"
      content="Looking for the Manali famous hotel for couples and family? Aeraki is the best hotels in Manali for couples and family to enjoy holidays with the natural best view.">
   <meta name="keywords"
      content="Best Hotels in Manali for Couples, Hotels in Manali with Best View, Manali Famous Hotel">
   <link href="css/bootstrap.min.css" rel="stylesheet">
   <link rel="stylesheet" type="text/css" href="css/menu.css" />
   <link rel="stylesheet" type="text/css" href="css/owl.carousel.css" />
   <link rel="stylesheet" type="text/css" href="css/style.css?s" />
   <link rel="stylesheet" type="text/css" href="css/media.css" />
   <link rel="stylesheet" type="text/css" href="css/animate.min.css" />
   <link rel="stylesheet" type="text/css" href="js/parsley.css" />
   <link rel="stylesheet" href="css/magnific-popup.css" />
   <link rel="stylesheet" href="css/font-awesome.min.css">
   <link rel="stylesheet" type="text/css" href="js/parsley.css" />
   <link rel="stylesheet" href="css/font-awesome.min.css">

   <script src="js/jquery-2.1.4.js"></script>
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-PGEVD3HJR0"></script>
   <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-PGEVD3HJR0');
   </script>
</head>

<?php include'include/header.php';?>

<section class="inner-banner contact-banner">
   <div class="container">
      <h2>career</h2>
   </div>
</section>

<section class="inner-main-sec">
   <div class="container">
      <div class="row">
         <div class="col-12">
            <p class="cont-desc">
               We, at Lex Premier, are happy to welcome exceptional legal professionals or interns who wish to be a part
               of our firm and its diverse practice areas. Our culture creates a platform for the development of
               professional expertise in an environment that cherishes excellence and teamwork.
            </p>
         </div>
      </div>
      <div class="contact-outer">
         <div class="contact-left">
            <h3>Contact info </h3>
            <ul class="foot-contact">
               <li><i><img src="images/cont-img1.svg">
                  </i>
                  <span>Phone:<br>
                     <a href="tel:+91-9646432408">+91-9646432408</a>

                  </span>
               </li>
               <li>
                  <i><img src="images/cont-img2.svg"></i>
                  <span>Email:<br>
                     <a href="mailto:info@lexpremier.com">info@lexpremier.com</a>

                  </span>
               </li>
               <li>
                  <i><img src="images/cont-img3.svg"></i>
                  <span>
                     Address:<br>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </span>
               </li>
            </ul>
         </div>

         <div class="contact-right">
            <h3>Contact form </h3>
            <div class="inner-cont-form">
               <form action="careermail.php" data-parsley-validate="" id="sendContact" method="POST" enctype="multipart/form-data">

                  <div class="txt-row width-50">
                     <div class="txt-fld">
                        <input type="text" name="name" required placeholder="Your Name">
                     </div>
                     <div class="txt-fld">
                        <input type="number" name="phone" min="1" required placeholder="Contact Number">
                     </div>
                  </div>
                  <div class="txt-row width-50">
                     <div class="txt-fld">
                        <input type="text" name="qualification" required placeholder="Qualification">
                     </div>
                     <div class="txt-fld">
                        <input type="text" name="experience" required placeholder="Experience">
                     </div>
                  </div>

                  <div class="txt-row">
                     <div class="txt-fld">
                        <textarea placeholder="Practice Area" name="practice_area" required></textarea>
                     </div>
                  </div>
                  <div class="txt-row">
                     <div class="txt-fld">
                        <label class="pointer" for="files">Upload resume (5 MB Max , only .pdf, .doc,.docx are allowed )</label>
                        <input class="hidden" type="file" name="cv" id="files" required placeholder="Upload your CV" data-parsley-trigger="change" 
                        data-parsley-filemaxmegabytes="5" data-parsley-filemimetypes="application/pdf, .doc, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document " >
                     </div>
                  </div>
                  <div class="txt-row">
                     <div class="txt-fld">
                        <label id="mail-status" class="text-success text-capitalize"></label>
                        <i class="fa fa-circle-o-notch fa-spin hidden"></i>
                        <button id="form_submit" name="submit">Submit </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</section>

<div class="map wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
  <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Panchkula , India&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
</div>

<?php include'include/footer.php';?>
<script src="js/bootstrap.min.js"></script>
<script src="js/wow.js"></script>
<script src="js/parsley.js"></script>
<script src="js/parsley.js"></script>


<script src="js/modernizr.min.js"></script>
<script src="js/isotope.pkgd.js"></script>
<script src="js/jquery.magnific-popup.js"></script>



<script src="js/owl.carousel.js"></script>
<script>
   $(document).ready(function () {
      var app = app || {};

// Utils
(function ($, app) {
    'use strict';

    app.utils = {};

    app.utils.formDataSuppoerted = (function () {
        return !!('FormData' in window);
    }());

}(jQuery, app));

// Parsley validators
(function ($, app) {
    'use strict';

         window.Parsley
            .addValidator('filemaxmegabytes', {
                  requirementType: 'string',
                  validateString: function (value, requirement, parsleyInstance) {

                     if (!app.utils.formDataSuppoerted) {
                        return true;
                     }

                     var file = parsleyInstance.$element[0].files;
                     var maxBytes = requirement * 1048576;

                     if (file.length == 0) {
                        return true;
                     }

                     return file.length === 1 && file[0].size <= maxBytes;

                  },
                  messages: {
                     en: 'File is to big'
                  }
            })
            .addValidator('filemimetypes', {
                  requirementType: 'string',
                  validateString: function (value, requirement, parsleyInstance) {

                     if (!app.utils.formDataSuppoerted) {
                        return true;
                     }

                     var file = parsleyInstance.$element[0].files;

                     if (file.length == 0) {
                        return true;
                     }

                     var allowedMimeTypes = requirement.replace(/\s/g, "").split(','); 
                     return allowedMimeTypes.indexOf(file[0].type) !== -1;

                  },
                  messages: {
                     en: 'only .pdf, .doc,.docx are allowed'
                  }
            });

      }(jQuery, app));
      $(document).on("scroll", function () {
         if
            ($(document).scrollTop() > 1) {
            $("header").addClass("shrink");
         }
         else {
            $("header").removeClass("shrink");
         }
      });


      $('#form_submit').on('click', function (e) {
         $("#mail-status").html('');
         // e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
         // $("#form_submit").attr("disabled", true);
         // var formData = new FormData(this);
         // console.log(formData);
         if ($(this).parsley().isValid()) {
            $("#sendContact").submit();
            /* $('.contact-submit').addClass('loading');
            $('.fa-circle-o-notch').removeClass('hidden');
            jQuery.ajax({
               url: "career.php",
               data: formData,
               processData: false,
               type: "POST",
               success: function (data) {
                  $("#mail-status").html(data);
                  $('.contact-submit').removeClass('loading');
                  $("#form_submit").attr("disabled", false);
                  $('.fa-circle-o-notch').addClass('hidden');
                  $("#sendContact").reset();

               },
               error: function () {
                  $('.contact-submit').removeClass('loading');
                  $("#form_submit").attr("disabled", false);
                  $('.fa-circle-o-notch').addClass('hidden');
                  $("#sendContact").reset();
               }
            }); */
         }
      }); 
   });	 
</script>

<script src="js/menu.js"></script>
</body>

</html>

<?php 

if (isset($_SESSION['career_success']) ) { ?>
   <script>
      
      $("#mail-status").html('Career Enquirey submitted successfully');
      $('.contact-submit').removeClass('loading');
      $("#form_submit").attr("disabled", false);
      $('.fa-circle-o-notch').addClass('hidden');
      $("#sendContact").reset();
   </script>
<?php unset($_SESSION['career_success']); }?>