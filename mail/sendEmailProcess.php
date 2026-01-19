<?php

require "../mail/SMTP.php";
require "../mail/PHPMailer.php";
require "../mail/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstname = sanitizeInput($_POST['first-name'] ?? '');
    $lastname = sanitizeInput($_POST['last-name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    $errors = [];

    // Validation
    if (empty($firstname)) $errors[] = "First Name is required";
    if (empty($lastname)) $errors[] = "Last Name is required";
    if (empty($email)) $errors[] = "Email is required";
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";
    if (empty($phone)) {
        $errors[] = "Mobile is required";
    } elseif (!preg_match('/^\d{10}$/', $phone)) {
        $errors[] = "Mobile should be a 10-digit number";
    }
    if (empty($message)) $errors[] = "Message is required";

    if (!empty($errors)) {
        echo $errors[0];
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'maheeshanethmika5@gmail.com';
        $mail->Password = 'uwmp ybuo kjpb tzjv'; // App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // -------------------------
        // 1. Send email to ADMIN
        // -------------------------
        $mail->setFrom('maheeshanethmika5@gmail.com', 'Digiblast Web');
        $mail->addAddress('uriboyka450@gmail.com'); 
        $mail->addReplyTo($email, $firstname . ' ' . $lastname);

        $mail->isHTML(true);
        $mail->Subject = 'New Website Inquiry from ' . $firstname;
        
        $mail->Body = "
        <div style='font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;'>
            <div style='background: #222; color: #fff; padding: 20px; text-align: center;'>
                <h2 style='margin: 0;'>New Client Notification</h2>
            </div>
            <div style='padding: 20px; background: #fdfdfd;'>
                <p>You have received a new message through the website contact form.</p>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><b>Name:</b></td><td>{$firstname} {$lastname}</td></tr>
                    <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><b>Email:</b></td><td>{$email}</td></tr>
                    <tr><td style='padding: 8px; border-bottom: 1px solid #eee;'><b>Phone:</b></td><td>{$phone}</td></tr>
                </table>
                <div style='margin-top: 20px; padding: 15px; background: #fff5f5; border-left: 4px solid #e74c3c;'>
                    <p style='margin: 0;'><b>Message:</b></p>
                    <p style='color: #444;'>{$message}</p>
                </div>
            </div>
        </div>";

        if (!$mail->send()) {
            echo 'Service Unavailable. Please try again later';
            exit;
        }

        // -------------------------
        // 2. Auto-reply to CUSTOMER
        // -------------------------
        $mail->clearAddresses();
        $mail->addAddress($email, $firstname . ' ' . $lastname);
        $mail->Subject = 'We have received your message - Digiblast';

        // Social Icons Section (Oya langa thiyena real links danna)
        $fb_link = "#"; 
        $insta_link = "#";
        $web_link = "https://Digiblast.com"; 

        $mail->Body = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;'>
            <div style='background: #e74c3c; padding: 30px; text-align: center; color: white;'>
                <h1 style='margin: 0; font-size: 24px;'>Hello {$firstname}!</h1>
                <p style='margin-top: 10px;'>Thank you for connecting with Digiblast.</p>
            </div>
            <div style='padding: 30px; line-height: 1.6; color: #333;'>
                <p>We've successfully received your message and our team is already looking into it. We'll get back to you as soon as possible.</p>
                <p>In the meantime, feel free to explore our latest tour packages on our website.</p>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{$web_link}' style='background: #222; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Visit Website</a>
                </div>

                <hr style='border: 0; border-top: 1px solid #eee;'>
                <p style='text-align: center; font-size: 14px; color: #777;'>Stay connected with us:</p>
                <div style='text-align: center;'>
                    <a href='{$fb_link}' style='display: inline-block; margin: 0 10px; text-decoration: none; color: #3b5998; font-weight: bold;'>Facebook</a>
                    <a href='{$insta_link}' style='display: inline-block; margin: 0 10px; text-decoration: none; color: #e1306c; font-weight: bold;'>Instagram</a>
                </div>
            </div>
            <div style='background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #999;'>
                <p style='margin: 0;'>&copy; 2026 Digiblast. All rights reserved.</p>
            </div>
        </div>";

        
        if ($mail->send()) {
            echo 'Message Sent Successfully';
        } else {
            echo 'Auto-reply failed, but your message was received.';
        }

    } catch (Exception $e) {
        echo 'Service Unavailable. Please try again later';
        exit;
    }
}