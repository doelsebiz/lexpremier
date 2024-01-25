<?php
if(empty($_POST["email"])) {
    echo 'error occured! try again.';
    exit;
} ?>

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title> 
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>New Contact Enquiry</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>
                            <p><strong>Name : </strong> <?php echo @$_POST["first_name"].' '.@$_POST['last_name']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Number : </strong> <?php echo $_POST['phone']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Email : </strong> <?php echo $_POST['email']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Comments : </strong> <?php  echo ($_POST['comments']); ?></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>
    <?php
        require dirname(__FILE__)."/src/PHPMailer.php";
        require dirname(__FILE__)."/src/SMTP.php";
        require dirname(__FILE__)."/Exception.php";

        $content = ob_get_clean();
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        try{
            // $mail->send();

            mail("reservations.manali@aerakihotels.com","Aeraki Hotels Booking Enquiry",$content, $headers);

            /*$content = ob_get_clean();
            $mail = new PHPMailer\PHPMailer\PHPMailer();
            $mail->SMTPDebug = true;
            $mail->isSMTP();
            // $mail->Host = 'smtp.gmail.com';
            $mail->Host = 'localhost';
            // $mail->SMTPAuth = false;
            $mail->SMTPAutoTLS = false; 
            $mail->Port = 25; 
            $mail->SMTPAuth = false;
            // $mail->Port = 587;
            $mail->Username = 'reservations.manali@aerakihotels.com';
            $mail->Password = 'mY&47<>Z123';
            $toEmail = "reservations.manali@aerakihotels.com";


            // $mail->setFrom('Reservations.manali@aerakihotels.com', 'Contact Enquiry');
            $mail->addAddress($toEmail);


            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Contact form enquiry';
            $mail->Body    = $content;
            echo $mail->send();*/
            echo '<p class="text-success">Enquirey Submitted Successfully</p>';

        } catch(Exception $e){
            echo "Message could not be sent. Mailer Error: ";
        }
 ?>
