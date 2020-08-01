<?php

    $headers = apache_request_headers();
    $authKey = $headers['auth-key'];
    

    $cardNumber = $_POST['cNumber'];
	$expMonth = $_POST['expM'];
    $expYear = $_POST['expY'];
    $cvv = $_POST['cvv'];
    $amount = $_POST['amount'];


    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "accounts";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo "505";
    }

    $sql = "SELECT expMonth, expYear, cvv, lastApprdTransac, accBalance FROM cards WHERE cardNumber = $cardNumber";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        
        if ( $expMonth==$row["expMonth"] && $expYear==$row["expYear"] && $cvv==$row["cvv"]) {

            if ($authKey==$row["lastApprdTransac"]) {
                echo "303";
            }
            else {
                if ($amount<=$row["accBalance"]) {

                    $balance = $row["accBalance"]-$amount;

                    $sql2 = "UPDATE cards SET lastApprdTransac='$authKey', accBalance='$balance' WHERE cardNumber=$cardNumber";

                    if ($conn->query($sql2) === TRUE) {
                        echo "101";
                    } else {
                        echo "707";
                    }
                }
                else {
                    echo "606";
                }
            }
        }
        else {
            echo "202";
        }
    }
    } else {
    echo "404";
    }
    $conn->close();

?>