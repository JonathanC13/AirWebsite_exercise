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

  // include db connect class
  require_once __DIR__ . '/db_config.php';
  include 'db_connect.php';

  //
  /*
  $obj = new \stdClass(); // assuming you are trying to create a generic object and assign the property success, you need to declare $res as an object of stdClass in the global namespace:
  $obj->name = "John";
  $json_obj = json_encode($obj);
  echo $json_obj;
  */


  $conn = connect("uuu");

  //$sql = "INSERT INTO air_inventory (idair_inventory, airstock, price)
  //VALUES (3, 50, 0.00)";
  $TB_airInv = TB_AIR_INVENTORY;
  $sql = "SELECT * FROM $TB_airInv;";

  if ($result = $conn->query($sql)) {
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);
  } else {
    echo "err code: " . $conn->errno . "\n";
  }

  close($conn);

  /*
  // check if param sent with request
  if(isset($_POST['x'])){
    $obj = json_decode($_POST["x"], false);

    if($obj != null){

      $table_inv = TB_AIR_INVENTORY;

      // connecting to db
      $mysqli = connect("yeet");

      $query = "SELECT * FROM $table_inv";

      // check for empty result
      if ($result = $mysqli->query($query)) {
        $outp = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($outp);
      } else {
        echo "err code: " . $mysqli->errno . "\n";
      }

    } else {
      echo "null json obj";
    }
  } else {
    echo "no params";
  }
*/


?>
