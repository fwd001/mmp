$(function () {

  var param = getSearch()
  var pageid = param.pageid;
  // console.log(pageid);


  var totalCount = 0;
  var pagesize = 0;

  render(pageid);

  // 注册上一页下一页
  $('.page span:first').on('click', function (e) {
    param.pageid--;
    if (param.pageid <= 0) {
      param.pageid = 0;
      return;
    }
    page();
  })

  $('.page span:last').on('click', function (e) {
    param.pageid++;
    if (param.pageid > Math.floor(totalCount / pagesize)-1) {
      param.pageid = Math.floor(totalCount / pagesize)-1;
      return;
    }
    page();
  })

  // 注册selected改变时间
  $('#selectPage').on('change', function () {
    param.pageid = $(this).val();
    page();
  })


  // 给li注册跳转事件
  $('.mmp_recommended ul').on('click', 'li', function () {
    // console.log($(this).data('id'));
    location.href = 'moneyproduct.html?productid=' + $(this).data('id');
  })


  function page() {
    var url = '';
    for (var k in param) {
      url += k + '=' + param[k] + '&';
    }

    var url = url.substr(0, url.length - 1);
    console.log(url);

    location.href = 'moneyctrl.html?' + url;
  }
  
  function render(id) {
    Route.getmoneyctrl(id, function (info) {
      console.log(info);

      pagesize = info.pagesize;
      totalCount = info.totalCount;
      // console.log(totalCount, pagesize);

      $('.mmp_recommended ul').html(template('tpl', info))

      var count = Math.floor(totalCount / pagesize);

      for (var i = 0; i < count; i++) {
        // console.log(i);
        $('#selectPage').append('<option value="' + i + '">' + (i+1) + '/' + count + '</option>')
      }
      $('#selectPage').val(pageid);
    })
  }
})