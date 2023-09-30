<?php

$start = $_POST["start"];
$end = $_POST["end"];
$quantity = $_POST["quantity"];

if (isset($start) && isset($end) && isset($quantity)) {
    $connection = pg_connect('host=localhost dbname=phpTest user=postgres password=12334543321 port=5432');

    if (!$connection) {
        echo 'Connection error';
        exit;
    }

    for ($i = 0; $i < $quantity; $i++) {
        $FIO = $_POST['FIO' . $i];
        $jobTitle = $_POST['jobTitle' . $i];
        $department = $_POST['department' . $i];
        $email = $_POST['Email' . $i];
        $phone = $_POST['phone' . $i];
        if (checkFIO($FIO) && checkEmail($email)) {
            $res = pg_query($connection, "INSERT INTO publication (startDate, endDate, quantity, phone, FIO, Должность, Кафедра, email) VALUES 
            ('$start', '$end', '$quantity', '$phone', '$FIO', '$jobTitle', '$department', '$email')");
        } else {
            exit;
        }
    }

    if (!$res) {
        echo "Some error";
        exit;
    }

    // ------ Отправка уведомления на почту
    // $destination = "alis@sfedu.ru";
    // $pageTitle = 'Командировки ИКТИБ';
    // $message = "Начало командировки: $start \nКонец командировки: $end \nКоличество человек: $quantity \nНомер телефона: $phone";
    // mail($destination, $pageTitle, $message);//, "Content-type: text/html; charset=utf-8\n From: $destination")
} else {
    echo 'Вы ввели не все данные';
}

function checkEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail адрес указан неверно.";
    } else {
        return TRUE;
    }
}

function checkFIO($FIO) {
    $word = explode(" ", $FIO);
    if (count($word) != 3) {
        echo 'ФИО введено неверно';
    } else {
        return TRUE;
    }
}

?>