<?php
header("Access-Control-Allow-Origin:*");
// 資料來源
$host = 'localhost';
$dbname = 'wedding';
$dsn = "mysql:host=$host;dbname=$dbname";

$username = "root";
$password = "123";
try {
    // 建立MySQL伺服器連接和開啟資料庫 
    $pdo = new PDO($dsn, $username, $password);
    $sql = "SELECT * FROM expense";
    // 送出UTF8編碼的MySQL指令(才能顯示中文)
    $pdo->query('SET NAMES utf8');
    // statement
    $stmt = $pdo->query($sql);

    $rows = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        foreach ($row as $key => $value) {
            $r[$key] = urlencode(trim($value));
        };
        array_push($rows, $r);
    }

    $json = json_encode($rows, JSON_UNESCAPED_SLASHES);
    $json = urldecode($json);
    echo $json;
} catch (PDOException $e) {
    echo "連接失敗: " . $e->getMessage();
}
