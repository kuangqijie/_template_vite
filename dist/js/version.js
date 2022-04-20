
var query_string = location.search;
var version = 1;
var link = '';
if (query_string.indexOf('v=' + version) < 0) {
  if (/\bv=\d+/.test(query_string)) {
    link = location.href.replace(/\bv=\d+/, 'v=' + version)
  } else {
    //获取不带锚点的url
    var uri = location.href.replace(location.hash, '')
    link = uri + (location.search ? '&' : '?') + 'v=' + version + location.hash
  }
  
  location.replace(link);
}
