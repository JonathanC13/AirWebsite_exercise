

function myFunction(){

  // on button cliked his demo element changes
    document.getElementById("demo").innerHTML = "HIIIIIIII";



  obj = {"idair_inventory" : 0};
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();

  // handle response
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){ // this.status == 200 // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState

      document.getElementById("JSON_RET").innerHTML = this.readyState + " : " + this.responseText;

      /*
      myObj = JSON.parse(this.responseText);

      for( x in myObj){
        txt += myObj[x].idair_inventory + "<br>";
      }

      document.getElementById("JSON_RET").innerHTML = txt;
      */

    } else {
      document.getElementById("demo").innerHTML = xmlhttp.readyState + " : " + xmlhttp.status + " : " + xmlhttp.statusText;
    }
  }

  xmlhttp.open("POST", "http://localhost:8080/AirWebsite/AirPHP/db_getAirInventory.php", true); // true = async call
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  //xmlhttp.send("x=" + dbParam);
  xmlhttp.send();


}
