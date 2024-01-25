<?php 
session_start();
$tmp_name = $_FILES["cv"]["tmp_name"];
$name = time().basename($_FILES["cv"]["name"]);
move_uploaded_file($tmp_name, "uploads/$name"); 
  ?>

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
                        <th>New Career Enquiry</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>
                            <p><strong>Name : </strong> <?php echo @$_POST['name']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Number : </strong> <?php echo $_POST['phone']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>qualification : </strong> <?php echo $_POST['qualification']; ?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p><strong>Experience : </strong> <?php  echo ($_POST['experience']); ?></p>
                        </td>
                    </tr> 
                    <tr>
                        <td>
                            <p><strong>Practice Area : </strong> <?php  echo ($_POST['practice_area']); ?></p>
                        </td>
                    </tr> 
                    <tr>
                        <td>
                            <p><strong>CV : </strong> <a href="https://lexpremier.in/upload/<?php echo $name; ?>"><?php  echo $name; ?></a> </p>
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
            $mail = new PHPMailer\PHPMailer\PHPMailer();
            $mail->SMTPDebug = false;
            $mail->isSMTP();
            $mail->Host = 'smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 2525;
            $mail->Username = 'cb97c04119736c';
            $mail->Password = '31124e80cba4c4';
            $toEmail = "lexpremierllp@gmail.com";


            $mail->setFrom('lexpremierllp@gmail.com', 'Hemant kumar');
            $mail->addAddress($toEmail);


            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'New Appointment from Lex premier';
            $mail->Body    = $content;
            $mail->send();
            $_SESSION['career_success'] = 1; 
            header('Location: '.$_SERVER['HTTP_REFERER']);


        } catch(Exception $e){
            header('Location: '.$_SERVER['HTTP_REFERER']);

        }
 ?>
