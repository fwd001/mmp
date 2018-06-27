$(function () {
  var param = getSearch()
  var categoryid = param.categoryid;
  var pageid = param.pageid;
  console.log(pageid);

  
  var totalCount = 0;
  var pagesize = 0;

  // var category = decodeURI(param.category);
  // console.log(param);

  render(categoryid, pageid);

  Route.getcategorybyid(categoryid, function (info) {
    $('.categoryTxt span').text(info.result[0].category);
    param.category = info.result[0].category;
  })

  $('.page span:first').on('click', function (e) {
    param.pageid--;
    if (param.pageid <= 1) {
      param.pageid = 1;
    }
    page();
  })

  // 注册selected改变时间
  $('#selectPage').on('change', function() {
    param.pageid = $(this).val();
    page();
  })

  $('.page span:last').on('click', function (e) {
    param.pageid++;
    if (param.pageid >= Math.ceil(totalCount / pagesize)) {
      param.pageid = Math.ceil(totalCount / pagesize);
    }
    page();
  })

  function page() {
    var url = '';
    for (var k in param) {
      url += k + '=' + param[k] + '&';
    }

    var url = url.substr(0, url.length - 1);
    console.log(url);

    location.href = 'productlist.html?' + url;
    $(this).find('a').attr('href', 'productlist.html?' + url)

  }


  // 渲染函数
  function render(categoryid, pageid) {
    Route.getproductlist(categoryid, pageid, function (info) {
      console.log(info);
      pagesize = info.pagesize;
      totalCount = info.totalCount;
      $('.mmp_product').html(template('tpl', info))

      var count = Math.ceil(totalCount / pagesize);

      for (var i = 1; i <= count; i++) {
        // console.log(i);
        $('#selectPage').append('<option value="' + i + '">' + i + '/' + count + '</option>')
      }
      $('#selectPage').val(pageid);

    })
  }



  function getSearch() {
    var txt = location.search.slice(1).split('&');
    var obj = {};
    txt.forEach(function (e, i) {
      var key = e.split('=')[0];
      var value = e.split('=')[1];
      obj[key] = value
    })
    return obj
  }
})