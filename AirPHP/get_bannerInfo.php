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

  $obj = new \stdClass(); // assuming you are trying to create a generic object and assign the property success, you need to declare $res as an object of stdClass in the global namespace:
  $obj->title = "Air";
  $obj->caption = "Air is just air, my guy.";
  $json_obj = json_encode($obj);
  echo $json_obj;

?>
