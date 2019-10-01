window.onload = function load_pageInfo(){
  load_bannerInfo();

  load_inventoryInfo();
}


function load_bannerInfo(){

  // set banner image
  load_AirImage();

  // AJAX
  xmlhttp = new XMLHttpRequest();

  // handle response
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){ // this.status == 200 // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState


      myObj = JSON.parse(this.responseText);

      document.getElementsByClassName("BG_CAPTIONTITLE")[0].innerHTML = myObj.title;
      document.getElementsByClassName("BG_CAPTIONINFO")[0].innerHTML = myObj.caption;

      document.getElementsByClassName("BANNER_TITLE")[0].innerHTML = myObj.title;
      document.getElementsByClassName("BANNER_INFO")[0].innerHTML = myObj.caption;

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


function load_AirImage(){
  console.log("HI");
  fetch(`https://source.unsplash.com/1920x1080/?sky,clouds`).then((response) => {

    document.getElementsByClassName("banner")[0].style.backgroundImage = "url( " + response.url + " )";
    // `<a href="${response.url}"> <img class="Air-image" style="height:100%;width:100%;" src="${response.url}" alt="Air image"/> </a>`;

  })
}

function load_inventoryInfo(){

  // html elements
  const prod_row =
    '<div class="row PROD_ROW" id="PRODUCT_ROW">' +
    '</div>';
  const prod_col =
    '<div class="col-lg-4 PROD_COL"> ' +
      'OK' +
    '</div>';
  const prod_jumbo =
    '<div class="jumbotron jumbotron-fluid BG_3D">' +

      '<div class="jumbotron jumbotron-fluid PROD_JUMBO" id="JUM">' +
        '<div class="container" id="product_jumboContainer" >' +
          '<h3 class="CITY_NAME" id="city_text">' +
            'Air - ' +
          '</h3>' +
          '<div class="container PROD_IMAGE" style="height:250px;">' +
          '</div>' +
          '<br>' +
          '<p class="PRICE" id="price_text" >' +
            'Price for each Litre: $ ' +
          '</p>' +
          '<p class="STOCK" id="stock_text">' +
            'Stock: ' +
          '</p>' +
          '<div class="PROD_QUANTITYROW_HOLDER"> </div>' +
        '</div>' +
      '</div>' +

    '</div>';
  const prod_quantityRow =
    '<div class="row QUANT_ROW">' +
      '<div class="col-lg-4 "> '+
        '<img class="AIR_CAN" id="airCan_img" alt="Air Can"> </img>'+
      '</div> '+
      '<div class="col-lg-4">'+
        '<div class="row QUANT_INPUTBOX_ROW">' +
        '</div>' +

        '<div class="row">' +
          '<div class="col-lg-6  SUB_COL">'+
          '</div> '+
          '<div class="col-lg-6 ADD_COL">'+
          '</div> ' +
        '</div>' +
      '</div> '+
      '<div class="col-lg-4 BUY_COL">'+
      '</div> '+
    '</div>';
  //// create so that the buttons are linked to the input box [id=neg1][id=pos1][id=input1][id=1 (BUY button)]. They buy id is number of the product in the json to update
  const prod_inputSection =
    '<input type="number" class="form-control QUANT_IN"> </input>';
  const prod_subBtn = '<button type="number" class="btn btn-block SUBBUTTON">-</button>';
  const prod_addBtn = '<button type="number" class="btn btn-block ADDBUTTON">+</button>';
  const prod_buyBtn = '<button class="btn btn-block BUYBUTTON">BUY?!</button>' // data-toggle="modal" data-target="#myModal"

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
  const htmlClass_prodQuantIn = 'QUANT_INPUTBOX_ROW';
  const htmlClass_quantBox = 'QUANT_IN';
  const htmlClass_subBtnCol = 'SUB_COL';
  const htmlClass_subBtnAct = 'SUBBUTTON';
  const htmlClass_addBtnCol = 'ADD_COL';
  const htmlClass_addBtnAct = 'ADDBUTTON';
  const htmlClass_buyCol = "BUY_COL";
  const htmlClass_buyBtnAct = 'BUYBUTTON';


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

        let prodColClass = prodRowClass.getElementsByClassName(htmlClass_prodCol)[k % 3];  // col number in the row
        prodColClass.innerHTML = prod_jumbo;           // set a jumbotron in the current column

        let prodJumboClass = prodColClass.getElementsByClassName(htmlClass_prodJumbo)[0];

        // add city name
        prodJumboClass.getElementsByClassName(htmlClass_prodCity)[0].innerHTML += myObj[k].air_city;
        // add price to the jumbo
        prodJumboClass.getElementsByClassName(htmlClass_prodPrice)[0].innerHTML += myObj[k].air_price;
        // add stock level to jumbo
        prodJumboClass.getElementsByClassName(htmlClass_prodStock)[0].innerHTML += myObj[k].air_stock;

        // TODO load city image
        // ...

        let prodQuantRowClass = prodJumboClass.getElementsByClassName(htmlClass_prodQuantityRowHolder)[0];
        prodQuantRowClass.innerHTML = prod_quantityRow;

        // set product image
        prodQuantRowClass.getElementsByClassName(htmlClass_prodAirCan)[0].src = '../images/surpremeLmao_alt.png';

        // set input box
        let prodInRow = prodQuantRowClass.getElementsByClassName(htmlClass_prodQuantIn)[0];
        prodInRow.innerHTML = prod_inputSection;
        prodInRow.getElementsByClassName(htmlClass_quantBox)[0].setAttribute("value", 0);

        // set subtract and add input box buttons
        let prodQuantSubCol = prodQuantRowClass.getElementsByClassName(htmlClass_subBtnCol)[0];
        prodQuantSubCol.innerHTML += prod_subBtn;
        let prodQuantAddCol = prodQuantRowClass.getElementsByClassName(htmlClass_addBtnCol)[0];
        prodQuantAddCol.innerHTML += prod_addBtn;

        // set buy button
        let prodBuyCol = prodQuantRowClass.getElementsByClassName(htmlClass_buyCol)[0];
        prodBuyCol.innerHTML += prod_buyBtn;

      }

      // load prod images
      load_prodAirImages(retObj_len);

      setButtonListeners(retObj_len, myObj);

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

function load_prodAirImages(size){

  for(let i = 0; i < size; i ++){
    fetch(`https://source.unsplash.com/featured/?clouds`).then((response) => {

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

function setButtonListeners(i_prodLen, jsObj_resp){
  // add listener to the buttons

  for(let i = 0; i < i_prodLen; i++){

    // subtract button
    document.getElementsByClassName('SUBBUTTON')[i].addEventListener("click", function() {
      subtractQuantityBtn_OnClick(i, jsObj_resp);
    });

    // addition button
    document.getElementsByClassName('ADDBUTTON')[i].addEventListener("click", function() {
      addQuantityBtn_OnClick(i, jsObj_resp);
    });

    // Buy button
    document.getElementsByClassName('BUYBUTTON')[i].addEventListener("click", function() {
      buyBtn_OnClick(i, jsObj_resp);
    });

  }
}

function subtractQuantityBtn_OnClick(int_elementIndex, stockLevel){
  var maxStock = parseInt(stockLevel);

  var inBox = document.getElementsByClassName("QUANT_IN")[int_elementIndex];

  var input_val = parseInt(inBox.value);
  var sub1 = input_val - 1;

  if (sub1 >= maxStock){
    inBox.value = maxStock;
  } else {
    if(sub1 >= 0){
      inBox.value = sub1;
    } else {
      inBox.value = 0;
    }
  }
}

function addQuantityBtn_OnClick(int_elementIndex, jsObj_resp){
  var maxStock = parseInt(jsObj_resp[int_elementIndex].air_stock);

  var inBox = document.getElementsByClassName("QUANT_IN")[int_elementIndex];

  var input_val = parseInt(inBox.value);
  var add1 = input_val + 1;

  if(add1 <= 0){
    inBox.value = 0;
  } else {
    if(add1 > maxStock){
      inBox.value = maxStock;
    } else {
      inBox.value = add1;
    }
  }
}

function buyBtn_OnClick(int_elementIndex, jsObj_resp){
  var maxStock = parseInt(jsObj_resp[int_elementIndex].air_stock);

  var inBox = document.getElementsByClassName("QUANT_IN")[int_elementIndex];
  var input_val = parseInt(inBox.value);

  var modalMessage = "";
  var valid_sale = false;

  if(input_val < 0 || input_val > maxStock){
     modalMessage += "Error, you tried to order " + input_val + " can(s) of air! You're a silly goose. :)";
  } else if(input_val == 0){
    modalMessage += "You tried to order 0 can(s) of air! :o";
  } else {
    modalMessage += "Congratulations, you have ordered " + input_val + " can(s) of air! We don't need your shipping address, we'll just release it into the atmosphere and there's a chance that it'll get to where you are. :D";
    valid_sale = true;
  }

  // modal needs some work for now use alert()
  alert(modalMessage);
  //document.getElementById("modalMsg").innerHTML = modalMessage;
  //document.getElementById("myModal").modal();

  if(true){
    // all that is needed to make the purchase is subtract the stock integer on the database
    var new_obj = jsObj_resp[int_elementIndex];

    new_obj.air_stock = new_obj.air_stock - input_val;

    var new_json = JSON.stringify(new_obj);
    //console.log("no: " + new_json);

    // AJAX
    xmlhttp = new XMLHttpRequest();

    // handle response
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){ // this.status == 200 // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        // for admin
        console.log("Success");
      }
    }

    // TODO, write php to alter stock level for the purchased product
    xmlhttp.open("POST", "http://localhost:8080/AirWebsite/AirPHP/TODO.php", true); // true = async call
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.send(); // send AJAX request. Asynchronous JavaScript And XML.
    // /AJAX

  }
}
