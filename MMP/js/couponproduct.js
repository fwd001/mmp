$(function () {

  var boxWidth = $('.box').width();

  var index = 0;
  var length = 0;
  var param = getSearch();

  render(param.couponid);

  $('.arr-r').on('click', function (e) {

    index++;
    index = index > length ? length : index;
    $('.box ul').css({
      transform: "translateX(" + -index * boxWidth + "px)"
    })
    e.stopPropagation();

  })
  $('.arr-l').on('click', function (e) {
    index--;
    index = index < 0 ? 0 : index;
    $('.box ul').css({
      transform: "translateX(" + -(index * boxWidth) + "px)",
    })
    e.stopPropagation();
  })

  $('.mask').on('click', function () {
    $(this).hide();
  })
  $('.mmp_couponproduct').on('click', 'li', function () {
    $('.mask').show();
  })

  function render(id) {

    Route.getcouponproduct(id, function (info) {
      console.log(info);
      length = info.result.length;
      $('.box ul').width((length+1) * boxWidth );
      $('.mmp_couponproduct').html(template('tpl', info));

      $('.box ul').html(template('tpl2', info));
    })
  }
})