<?php

// Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      exit(0);
  }

  //header("Content-Type: application/json; charset=UTF-8");

  // include db connect class
  require_once __DIR__ . '/db_config.php';
  include 'db_connect.php';


  $obj = null;
  $obj = json_decode($_POST["x"], false);

  $conn = connect("uuu");

  //$sql = "UPDATE table_name SET column1 = value1, col2 = val2 WHERE condition; condition = "col1 = val"
  //(idair_inventory, airstock, price)

  $TB_airInv = TB_AIR_INVENTORY;
  $stock_num = $obj->air_stock;
  $prod_id = $obj->idair_inventory;
  $sql = "UPDATE $TB_airInv SET air_stock=$stock_num WHERE idair_inventory=$prod_id;";

  if ($result = $conn->query($sql)) {
    //echo json_encode("HI!");

    //on success, select the record that was updated and return it
    $sql_sel = "SELECT * FROM $TB_airInv WHERE idair_inventory=$prod_id;";
    if ($result_sel = $conn->query($sql_sel)) {
      $outp = $result_sel->fetch_all(MYSQLI_ASSOC);
      echo json_encode($outp); // send back new stock value
    } else {
      echo "sel query - err code: " . $conn->errno . "\n";
    }
  } else {
    echo "update query - err code: " . $conn->errno . "\n";
  }

  close($conn);

?>
