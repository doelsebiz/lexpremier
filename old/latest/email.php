<?php
if(empty($_POST["start_date"])) {
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
                        <th>New Reservation Enquiry</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>
                            <p><strong>Check-in : </strong> <?php echo $_POST["start_date"]; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Check-out : </strong> <?php echo $_POST['end_date']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>No. of Guest : </strong> <?php echo $_POST['guest']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Name : </strong> <?php  echo ($_POST['name']); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Email : </strong> <?php echo $_POST['email']; ?></p>
                        </td>
                    </tr>                    <tr>
                        <td>
                            <p><strong>Phone Number : </strong> <?php echo $_POST['phone_no']; ?></p>
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
            mail("reservations.manali@aerakihotels.com","Aeraki Hotels Booking Enquiry",$content, $headers);
            echo 'Enquiry Submitted Successfully';

        } catch(Exception $e){
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
 ?>
