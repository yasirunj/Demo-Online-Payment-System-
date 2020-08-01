<?php

    $headers = apache_request_headers();
    $authKey = $headers['auth-key'];

    $merchant = $_POST['merchant'];
    $cardName = $_POST['cName'];
    $cardNumber = $_POST['cNumber'];
    $refID = $_POST['refID'];
    $amount = $_POST['amount'];
    $status = $_POST['status'];
    $response = $_POST['response'];

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "$merchant";

	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	  }
	
	$sql = "INSERT INTO transactions (CardHolderName, CardNumber, AuthKey, ReferenceID, Amount, TransStatus, Response) VALUES ('$cardName', '$cardNumber', '$authKey', '$refID', '$amount', '$status', '$response')";

	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();
	
?>