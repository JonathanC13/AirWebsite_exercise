

// CONCAT with load_pageInfo.js

function load_InventoryInfo(){

  // html elements
  const prod_row =
    '<div class="row PROD_ROW" id="PRODUCT_ROW">' +
    '</div>';
  const prod_col =
    '<div class="col-sm-4 PROD_COL"> ' +
      'OK' +
    '</div>';
  const prod_jumbo =
    '<div class="jumbotron jumbotron-fluid BG_3D">' +

        '<div class="jumbotron jumbotron-fluid PROD_JUMBO" id="JUM">' +
          '<div class="container" style="margin: -50px 0px -50px 0px;">' +
            '<h3 class="CITY_NAME" style="text-align:center;vertical-align: text-top;">' +
              'Air - ' +
            '</h3>' +
            '<div class="container PROD_IMAGE" style="height:250px;" style="border-style:solid;border-color:red;">' +
            '</div>' +
            '<br>' +
            '<p class="PRICE" style="text-align:center;">' +
              'Price for each Litre: $ ' +
            '</p>' +
            '<p class="STOCK" style="text-align:center;">' +
              'Stock: ' +
            '</p>' +
            '<div class="PROD_QUANTITYROW_HOLDER"> </div>' +
          '</div>' +
        '</div>' +

    '</div>';
  const prod_quantityRow =
    '<div class="row QUANT_ROW">' +
      '<div class="col-sm-4 "> '+
        '<img class="AIR_CAN" alt="Air Can" style="background-color:transparent;border:none;height:100px;"> </img>'+
      '</div> '+
      '<div class="col-sm-4 "> OK '+
      '</div> '+
      '<div class="col-sm-4 "> OK '+
      '</div> '+
    '</div>';
  const prod_checkout = ""; // create so that the buttons are linked to the input box [id=neg1][id=pos1][id=input1][id=1 (BUY button)]. They buy id is number of the product in the json to update

  // html class names
  const htmlClass_prodList = 'PROD_LIST_CLASS';
  const htmlClass_prodRow = 'PROD_ROW';
  const htmlClass_prodCol = 'PROD_COL';
  const htmlClass_prodJumbo = 'PROD_JUMBO';
  const htmlClass_prodCity = 'CITY_NAME';
  const htmlClass_prodImage = 'PROD_IMAGE';
  const htmlClass_prodPrice = 'PRICE';
  const htmlClass_prodStock = 'STOCK';
  const htmlClass_prodQuantityRowHolder = 'PROD_QUANTITYROW_HOLDER';
  const htmlClass_prodAirCan = 'AIR_CAN';

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
      var prodListClass = document.getElementsByClassName(htmlClass_prodList)[0];  // getElementsByClassName returns all the classes that have the ClassName, so you need to index
      // current row;
      var prodRowClass = null;
      var r = 0;

      // build the html products list
      for(var k = 0; k < retObj_len; k ++){
        if(k % 3 == 0) {
          // at the start and every 3 items add a new row for the products
          prodListClass.innerHTML += prod_row;

          prodRowClass = prodListClass.getElementsByClassName(htmlClass_prodRow)[r];
          r++;
        }

        // add the columns in the current row
        prodRowClass.innerHTML += prod_col;

        var prodColClass = prodRowClass.getElementsByClassName(htmlClass_prodCol)[k % 3];  // col number in the row
        prodColClass.innerHTML = prod_jumbo;           // set a jumbotron in the current column

        var prodJumboClass = prodColClass.getElementsByClassName(htmlClass_prodJumbo)[0];

        // add city name
        prodJumboClass.getElementsByClassName(htmlClass_prodCity)[0].innerHTML += myObj[k].air_city;
        // add price to the jumbo
        prodJumboClass.getElementsByClassName(htmlClass_prodPrice)[0].innerHTML += myObj[k].air_price;
        // add stock level to jumbo
        prodJumboClass.getElementsByClassName(htmlClass_prodStock)[0].innerHTML += myObj[k].air_stock;

        var prodQuantRowClass = prodJumboClass.getElementsByClassName(htmlClass_prodQuantityRowHolder)[0];
        prodQuantRowClass.innerHTML = prod_quantityRow;

        prodQuantRowClass.getElementsByClassName(htmlClass_prodAirCan)[0].src = '../images/surpremeLmao_alt.png';
      }

      // load random air images from unsplash // https://source.unsplash.com/
      load_AirImages(retObj_len);
    }
  }

  xmlhttp.open("POST", "http://localhost:8080/AirWebsite/AirPHP/db_getAirInventory.php", true); // true = async call
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.send(); // send AJAX request. Asynchronous JavaScript And XML.
  // /AJAX


/*
  //  getElementsById(1...).getElementsById(2...) doesnt work

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

function load_AirImages(size){

  for(let i = 0; i < size; i ++){
    fetch(`https://source.unsplash.com/1600x900/?sky`).then((response) => {

      document.getElementsByClassName("PROD_IMAGE")[i].innerHTML = `<a href="${response.url}"> <img class="Air-image" style="height:100%;width:100%;" src="${response.url}" alt="Air image"/> </a>`;

    })
  }

}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
