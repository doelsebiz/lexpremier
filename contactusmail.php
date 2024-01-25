<?php

$name = $_POST['first_name'].' '.$_POST['last_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$comment = $_POST['comments'];


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';


$mail = new PHPMailer();
//Server settings
// SMTP configuration
    $mail->isMail();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;
    $mail->Username = 'lexpremierllp@gmail.com';
    $mail->Password = 'cyjsqvluuhqqpill';                          // SMTP password
    $mail->SMTPSecure = `tls`;                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;

$mail->setFrom('lexpremierllp@gmail.com', 'Lexpremier');

// Add a recipient
$mail->addAddress('anjalivashista09@gmail.com');

// Add cc or bcc 

// Email subject
$mail->Subject = 'New Contact Us Message';

// Set email format to HTML
$mail->isHTML(true);

// Email body content
  $mailContent = '
<div class="card" style="background-color: whitesmoke; padding: 20px;">
  <div class="card-body">
    <div style=" text-align: center;">
      <img style="width:100px;" src="http://lexpremier.in/images/logo.png">
    </div>
    <h1 style="text-align: center;">New Contact Us Message</h1><br>
      <table class="table table-dark table-hover" border="1" style="margin-left: auto;margin-right: auto;">
        <tr>
          <th style=" border: 1px solid #ddd; padding: 8px;">Name</th>
          <th style=" border: 1px solid #ddd; padding: 8px;">'.$name.'</th>
        </tr>
        <tr>
          <td style=" border: 1px solid #ddd; padding: 8px;">Email</td>
          <td style=" border: 1px solid #ddd; padding: 8px;">'.$email.'</td>
        </tr>
        <tr>
          <td style=" border: 1px solid #ddd; padding: 8px;">Phone Number</td>
          <td style=" border: 1px solid #ddd; padding: 8px;">'.$phone.'</td>
        </tr>
        <tr>
          <td style=" border: 1px solid #ddd; padding: 8px;">Comments</td>
          <td style=" border: 1px solid #ddd; padding: 8px;">'.$comment.'</td>
        </tr>
      </table>
  </div>
</div>';
$mail->Body = $mailContent;

// Send email
if(!$mail->send()){
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}else{
    echo 'Message has been sent';
}