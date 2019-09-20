

window.onload = function load_bannerInfo(){

  // AJAX
  xmlhttp = new XMLHttpRequest();

  // handle response
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){ // this.status == 200 // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState


      myObj = JSON.parse(this.responseText);

      document.getElementById("BANNER_TITLE").innerHTML = myObj.title;
      document.getElementById("BANNER_INFO").innerHTML = myObj.caption;

      document.getElementById("JSON_RET").innerHTML = "YEEEEEEEEEEEEEEEET";

    } else {
      document.getElementById("demo").innerHTML = xmlhttp.readyState + " : " + xmlhttp.status + " : " + xmlhttp.statusText;
    }
  }

  xmlhttp.open("POST", "http://localhost:8080/AirWebsite/AirPHP/get_bannerInfo.php", true); // true = async call
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.send(); // send AJAX request. Asynchronous JavaScript And XML.
  document.getElementById("JSON_RET").innerHTML = "oooooooooooooooooooooo";

}
