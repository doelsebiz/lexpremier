<!doctype html>
<html lang="zxx">
<head>
<?php include 'include/header.php';?>
<title>Our Blogs</title>
</head>
<body class="body-five">
<?php include 'include/head.php';?>
<div class="health-inssurance-hero-banner pt-5">          
    <div class="container-homepage">
        <div class="row">
            <div class="col-md-6">
                <div class="herrotext">
                    <h2 class="wow fadeInUp" data-wow-delay=".4s"><span>Our</span> Blogs</h2>
                   <!--  <h5 class="wow fadeInUp  text-justify" data-wow-delay=".6s"><span>Our health insurance plan helps you extend your personal health coverage beyond the coverage you receive through your provincial healthcare program our Private health insurance</span></h5> -->
                </div>
            </div>
            <div class="col-md-6">
                <div class="hero-image">
                    <img src="assets/img/images/blogs.gif">
                </div>
            </div>
        </div>
    </div>
</div>
<section class="chooses-blogs choose-us-area-five pb-70">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-9">
            <div class="row">
               
               <?php  for ($i=0; $i < 6; $i++) {  ?>
               <div class="col-md-4">
                  <div class="card blank-card mt-3">
                     <div class="card-body">
                        <div class="blog-image-card">
                           <img src="assets/img/images/people.jfif">
                        </div>
                        <div class="card-content">
                           <h3>Why choose an Independent Insurance Broker in Ontario?</h3>
                           <p>Independent Insurance Brokers in Ontario work as a customerâ€™s personal advisor on matters of insurance by bridging the gap between any insurance company and a customer. They work on behalf of their customerâ€™s requirements and not the insurance company, which allows them to choose a trustworthy firm amidst an array of insurance companies looking for potential clients. </p>
                        </div>
                        <div class="blogbutton">
                           <a href="">Read More..</a>
                        </div>
                     </div>
                  </div>
               </div>
               <?php } ?>
            </div>
         </div>
         <div class="col-md-3">
            <div class="box-widget fl-wrap mt-3">
               <div class="box-widget-content">
                   <div class="search-widget fl-wrap">
                       <form action="#" class="d-flex">
                           <input name="se" id="se12" type="text" class="search form-control" placeholder="Search..." value="">
                           <button class="search-submit2" id="submit_btn12"><i class="fa fa-search"></i> </button>
                       </form>
                   </div>
                  <div class="single-widget bg-secondary p-3 mt-3 rounded">
                        <h3 class="text-white">Useful Products<br><hr class="hr-footer"></h3>

                        <ul>
                            <li>
                                <a href="#">
                                        Life Products
                                    </a>
                            </li>
                            <li>
                                <a href="#">
                                        Visitor Products
                                    </a>
                            </li>
                            <li>
                                <a href="#">
                                        Investment Products
                                    </a>
                            </li>
                            <li>
                                <a href="#">
                                        Travel Products
                                    </a>
                            </li>
                        </ul>
                    </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>

<style type="text/css">
   .box-widget {
       margin-bottom: 40px;
       padding-left: 30px;
   }
   .search-widget input.search {
       background: #eee;
       border-radius: 4px 0 0 4px;
       position: relative;
       color: #000;
       -webkit-appearance: none;
   }
</style>

<?php include 'include/footer.php';?>
<div class="go-top go-top-five">
   <i class='bx bx-chevrons-up'></i>
   <i class='bx bx-chevrons-up'></i>
</div>
<!-- End Go Top Area -->
<?php include 'include/scripts.php';?>
</body>
</html>