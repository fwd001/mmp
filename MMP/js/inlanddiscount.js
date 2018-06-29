$(function () {
  Route.getinlanddiscount (function (info) {
    console.log(info);
    $('.inladdiscount').html(template('tpl', info))
  })
})