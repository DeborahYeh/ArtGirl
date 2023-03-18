<?php
$to = 'mail@mail.com'; //Change to your e-mail

$name = $_POST['name'];
$subject = $_POST['subject'];
$email = $_POST['email'];

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

$output = '';
$process = true;

if (strlen($name) < 2) {
	$output[] = array(
		'status' => 0,
		'field' => "name",
		'message' => "Name is too short"
	);
	$process = false;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$output[] = array(
		'status' => 0,
		'field' => "email",
		'message' => "Enter corrent e-mail."
	);
	$process = false;
}

if (strlen($message) < 2) {
	$output[] = array(
		'status' => 0,
		'field' => "message",
		'message' => "Message is too short."
	);
	$process = false;
}


if ($process) {
	$full_message .= 'Name: '.$name."\n";
	$full_message .= 'E-mail: '.$email."\n";
	$full_message .= "\n".$message;

	$headers .= 'From: '.$email."\r\n";
	$headers .= 'Reply-To: '.$email."\r\n";
	$headers .= 'X-Mailer: PHP/'.phpversion();

	if (mail($to, $subject, $full_message, $headers)) {
		$output[] = array(
			'status' => 1,
			'field' => "send",
			'message' => 'Hello '.$name.'. Thank you for your message.'
		);
	} else {
		$output[] = array(
			'status' => 0,
			'field' => "send",
			'message' => 'Could not send mail! Please check your PHP mail configuration.'
		);
	}
}
$response = json_encode($output);
die($response);
?>