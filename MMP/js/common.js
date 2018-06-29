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