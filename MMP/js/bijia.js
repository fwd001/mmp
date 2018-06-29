$(function () {
  var param = getSearch() 
  var name = decodeURI(param.brandName);
  // console.log(name);
  $('.categoryTxt span').text(name);

  Route.getproduct(param.productid, function (info) {
    console.log(info);
    $('.product_t').html(template('tpl', info))
    $('.product_b').html(template('tpl2', info))
  }) 

  Route.getproductcom(param.productid, function (info) {
    console.log(info);
    
    // $('.pinglun').html( template('tpl3', info));
  })
})