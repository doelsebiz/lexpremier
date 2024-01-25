<!DOCTYPE html>
<html class="no-js" lang="zxx">

<head>
   
<?php include 'include/head.php'?>

</head>

<body class="sign-up-as-host-page inner-page">
    <!--[if lte IE 9]>
      <p class="browserupgrade">
        You are using an <strong>outdated</strong> browser. Please
        <a href="https://browsehappy.com/">upgrade your browser</a> to improve
        your experience and security.
      </p>
    <![endif]-->

    <!-- Preloader -->
    <div class="preloader">
        <div class="preloader-inner">
            <div class="preloader-icon">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <!-- /End Preloader -->

    <!-- Start Header Area -->
    <div class="topHeader">
        <div class="container">
            <div class="row align-items-center">
                <div class="d-flex top-head-inner">
                    <div class="col-md-6 for-desktop t-head-left">
                        <ul>
                        <li class="nav-item">
                            <img src="assets/images/header/login.png">
                            <span>Wayfarer <a href="#">Login</a> | <a href="#">Signup</a></span>
                        </li>
                        <li class="nav-item">
                            <img src="assets/images/header/login.png">
                            <span>Host <a href="#">Login</a> | <a href="#">Signup</a></span>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)">
                            <img src="assets/images/header/bell.png">
                            Notification</a>
                        </li>
                        </ul>
                    </div>
                    <div class="col-md-6 t-head-right">
                        <ul>
                        
                        <li class="nav-item for-mobile">
                            <a href="javascript:void(0)">
                            <img src="assets/images/header/bell.png">
                            Notification</a>
                        </li>    
                        <li class="nav-item">
                            <img src="assets/images/header/phone.png">
                            <a href="#">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Help Center</a>
                            <img src="assets/images/header/question-mark.png">
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)">Covid-19 Updates & info</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <header class="header navbar-area">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="nav-inner">
                        <nav class="navbar navbar-expand-lg">
                            <a class="navbar-brand" href="index.html">
                                <h3>Wayfarers</h3>
<!--                                <img src="assets/images/logo/logo.svg" alt="Logo">-->
                            </a>
                            <button class="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a class="collapsed" href="javascript:void(0)">
                                            <span><img src="assets/images/header/host.png"></span>
                                            Find A Host
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0)" aria-label="Toggle navigation">
                                            <span><img src="assets/images/header/travel.png"></span>
                                            Travel with Us
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0)" aria-label="Toggle navigation">
                                            <span><img src="assets/images/header/home.png"></span>
                                            Become a Host
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="javascript:void(0)" aria-label="Toggle navigation">
                                            <span><img src="assets/images/header/login.png"></span>
                                            Log In | Sign Up
                                        </a>
                                    </li>
                                    <li class="nav-item for-mobile">
                                        <img src="assets/images/header/host.png">
                                        <span>Wayfarer <a href="#">Login</a> | <a href="#">Signup</a></span>
                                    </li>
                                    <li class="nav-item for-mobile">
                                        <img src="assets/images/header/host.png">
                                        <span>Host <a href="#">Login</a> | <a href="#">Signup</a></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="button header-button">
                                <a href="javascript:void(0)" class="btn">Join Now</a>
                            </div>
                        </nav> <!-- navbar -->
                    </div>
                </div>
            </div> <!-- row -->
        </div> <!-- container -->
    </header>
    <!-- End Header Area -->

    <!-- Start Hero Area -->
    <section id="signup-host-banner" class="hero-area overlay">
        <div class="container">
            <div class="row">
                <div class="col-lg-7">
                    <div class="hero-text">
                        <!-- Start Hero Text -->
                        <div class="section-heading">
                            <h2 class="wow fadeInUp mb-4" data-wow-delay=".3s">
                                Registering as a host with <span>Wayfarers</span> is completely free of charge.
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="form-box">
                        <form id="contact" action="" method="post">
                            <h3 class="text-center">Sign up as a host</h3>
                            <fieldset class="d-flex name">
                                <div>   
                                    <input placeholder="First Name" type="text" required autofocus>
                                </div>
                                <div>   
                                    <input placeholder="Last Name" type="text" required>
                                </div>
                            </fieldset>
                            
                            <fieldset> 
                                <input placeholder="Email Address" type="email" required>
                            </fieldset>
                            
                            <fieldset>
                                <input placeholder="Confirm your email" type="email" required>
                            </fieldset>
                            
                            <fieldset class="password">
                                <input placeholder="Password" type="password" required>
                            </fieldset>
                            
                            <fieldset class="checkbox">
                                <input type="checkbox" required>
                                <label>I accept the Worldpackers terms of use, <a href="#">privacy,</a> and <a href="#">reviews.</a></label> 
                            </fieldset>
                            
                            <fieldset>
                              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Become a host</button>
                            </fieldset>
                            <hr>
                            <div class="text-center already-member"><h4>Already a member? <a href="#">Log In</a></h4></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Hero Area -->


    <section id="who-are-hosts" class="section custom-padding">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="text-center mb-5 title">
                        <h2>Who are the wayfarers hosts?</h2>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center service">
                        <div class="img-box"><img src="assets/images/host/home.png"></div>
                        <h3>Hospitality businesses</h3>
                        <p>Hostels, hotels, bed and breakfasts, home, stays, and more.</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center service">
                        <div class="img-box"><img src="assets/images/host/leaves.png"></div>
                        <h3>Eco projects</h3>
                        <p>Farms, permaculture projects, ecovillages, ecolodges, and holistic centers.</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center service">
                        <div class="img-box"><img src="assets/images/host/people.png"></div>
                        <h3>Social projects</h3>
                        <p>NGOs, schools, and community projects.</p>
                    </div>
                </div>
                <div class="text-center mt-5 become-a-host"><a href="#">Become a host</a></div>
            </div>
        </div>
    </section>


    <section id="who-are-wayfarers" class="section custom-padding">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="text-center mb-5 title">
                        <h2>Who are the wayfarers?</h2>
                    </div>
                </div>
                <div class="col-6">
                    <div class="service">
                        <div class="img-box"><img src="assets/images/host/mobile.png"></div>
                        <h3>Our platform is free for hosts</h3>
                        <p>Post your open positions, receive help from as many volunteers as you need, and be a part of global community without paying anything at all.</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="service">
                        <div class="img-box"><img src="assets/images/host/world.png"></div>
                        <h3>Travelers from over 170 countries</h3>
                        <p>All wayfarers travelers have access have access to our WP Academy, a platform of courses designed by the WP team and our community, to prepare them for productive collaborative</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="service">
                        <div class="img-box"><img src="assets/images/host/safety.png"></div>
                        <h3>An extra layer of safety</h3>
                        <p>Get to know the travelers you are hosting by checking their profiles and the reviews left by other hosts. Our community is also made safer thanks to our</p>
                    </div>
                </div>
                <div class="col-6">
                    <div class="service">
                        <div class="img-box"><img src="assets/images/host/badge.png"></div>
                        <h3>Top Hosts Program</h3>
                        <p>As a Top Host, you'll have more visibility in our search rankings, be eligible to receive awards from wayfarers, earn money with our</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="become-a-host" class="section custom-padding overlay">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center content-block">
                        <h1>Become a host</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <div class="register-now"><a href="#">Register Now</a></div>
                    </div>
                </div>
            </div>
          </div>
    </section>
    

   <?php include 'include/footer.php';?>

    <!-- ========================= scroll-top ========================= -->
    <a href="#" class="scroll-top btn-hover">
        <i class="lni lni-chevron-up"></i>
    </a>

   <?php include 'include/script.php';?>
</body>

</html>