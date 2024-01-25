<?php

$name = $_POST['name'];
$phone = $_POST['phone_no'];
$email = $_POST['email'];
$start_date = $_POST['start_date'];
$time = $_POST['time'];
$message = $_POST['message'];




// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
$mail = new PHPMailer;                              // Passing `true` enables exceptions


    //Server settings
    $mail->isMail();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;
    $mail->Username = 'lexpremierllp@gmail.com';
    $mail->Password = 'cyjsqvluuhqqpill';                          // SMTP password
    $mail->SMTPSecure = `tls`;                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    //Recipients
    $mail->setFrom('lexpremierllp@gmail.com', 'Lexpremier');
    $mail->addAddress('anjalivashista09@gmail.com');     // Add a recipient
    $mail->addReplyTo('lexpremierllp@gmail.com');
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'New Appointment Enquiry' ;

  $mailContent = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Form</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
<div class="card" style="background-color: whitesmoke; padding: 20px;">
  <div class="card-body">
    <div style=" text-align: center;">
      <img style="width:100px;" src="http://lexpremier.in/images/logo.png">
    </div>
    <h1 style="text-align: center;">New Appointment Booking</h1><br>
      <table style="margin-left: auto;margin-right: auto;">
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
        <td style=" border: 1px solid #ddd; padding: 8px;">Start Date</td>
        <td style=" border: 1px solid #ddd; padding: 8px;">'.$start_date.'</td>
      </tr>
      <tr>
        <td style=" border: 1px solid #ddd; padding: 8px;">Time</td>
        <td style=" border: 1px solid #ddd; padding: 8px;">'.$time.'</td>
      </tr>
      <tr>
        <td style=" border: 1px solid #ddd; padding: 8px;">Message</td>
        <td style=" border: 1px solid #ddd; padding: 8px;">'.$message.'</td>
      </tr>
    </table>
  </div>
</div>
</body>
</html>';

    $mail->Body    = $mailContent ;
    $mail->send();

if(!$mail->send()){
    echo 'Message could not be sent.';
    echo 'Error: '. $mail->ErrorInfo;
}else{
  echo 'Appointment Booked Successfully';
} 
?>