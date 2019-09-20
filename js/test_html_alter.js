

window.onload = function load_bannerInfo(){

  var prod_row = '<div class="row PROD_ROW" id="PRODUCT_ROW"> </div>';
  var prod_col = '<div class="col-sm-4 PROD_COL"> OK </div>';
  var prod_jumbo = '<div class="jumbotron jumbotron-fluid PROD_JUMBO" id="JUM"> <div class="container"> <h3 class="CITY_NAME" style="text-align:center;"> Air - </h3> <p class="PRICE" style="text-align:center;">Price for each Litre: $ </p> <p class="STOCK" style="text-align:center;">Stock: </p> </div> </div>';

  // Execute PHP to get the Air inventory
  // AJAX
  xmlhttp = new XMLHttpRequest();

  var myObj = null;
  // handle response
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){ // this.status == 200 // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState

      myObj = JSON.parse(this.responseText); // json string to JS obj

      // get the length of the Obj.
      var retObj_len = Object.size(myObj);
      console.log("RET: " + retObj_len);

      // html elements
      // section for the product lists
      var prodListClass = document.getElementsByClassName("PROD_LIST_CLASS")[0];  // getElementsByClassName returns all the classes that have the ClassName, so you need to index
      // current row;
      var prodRowClass = null;
      var r = 0;

      // build the html products list
      for(var k = 0; k < retObj_len; k ++){
        if(k % 3 == 0) {
          // at the start and every 3 items add a new row for the products
          prodListClass.innerHTML += prod_row;

          prodRowClass = prodListClass.getElementsByClassName("PROD_ROW")[r];
          r++;
        }

        // add the columns in the current row
        prodRowClass.innerHTML += prod_col;

        var prodColClass = prodRowClass.getElementsByClassName("PROD_COL")[k % 3];  // col number in the row
        prodColClass.innerHTML = prod_jumbo;           // set a jumbotron in the current column

        var prodJumboClass = prodColClass.getElementsByClassName("PROD_JUMBO")[0];

        // add city name
        prodJumboClass.getElementsByClassName("CITY_NAME")[0].innerHTML += myObj[k].air_city;
        // add price to the jumbo
        prodJumboClass.getElementsByClassName("PRICE")[0].innerHTML += myObj[k].air_price;
        // add stock level to jumbo
        prodJumboClass.getElementsByClassName("STOCK")[0].innerHTML += myObj[k].air_stock;
      }
    }
  }

  xmlhttp.open("POST", "http://localhost:8080/AirWebsite/AirPHP/db_getAirInventory.php", true); // true = async call
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.send(); // send AJAX request. Asynchronous JavaScript And XML.
  // /AJAX


/*
  //  getElementsById(1...).getElementsById(2...) does NOT work since (1) is not a function that returns an element

  var prodColClass = prodRowClass.getElementsByClassName("PROD_COL");
  var col_len = prodColClass.length;
  console.log("classes len: " + col_len);

  for(var i=0; i < col_len; i++)
  {

    // innerHTML
    prodColClass[i].innerHTML = prod_jumbo;

    // style of jumbo


    // Style of column
    //prodColClass[i].style["borderStyle"] = "solid";
    //prodColClass[i].style["borderColor"] = "red";
  }
*/
  //var x1 = prodListClass.getElementsByClassName("PRODUCT_COL")[1].style["borderStyle"] = "solid";


  /*
  prodRowID.style.borderStyle = "solid";
  prodRowID.style.borderColor = "blue";

  var columns = document.getElementById("PRODUCT_ROW").getElementsByClassName("PRODUCT_COL");
  var col_len = document.getElementById("PRODUCT_ROW").getElementsByClassName("PRODUCT_COL").length;
  console.log("classes len: " + col_len);

  for(var i=0; i < col_len; i++)
  {

    // innerHTML
    columns[i].innerHTML = jumbo;

    // style of jumbo
    columns[i].getElementById("PROD_JUMBO").style.height = "100vh";

    // Style of column
    columns[i].style["borderStyle"] = "solid";
    columns[i].style["borderColor"] = "red";
  }

  */
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
