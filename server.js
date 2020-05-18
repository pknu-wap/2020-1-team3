var http = require('http');
var fs =require('fs');
var url=require('url');
var qs = require ('querystring');

var app= http.createsever(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname=url.parse(_url, true).pathname;

if(pathname=='/')/*홈페이지 주소*/{
  if(queryData.id==undefined){


    response.writeHead(200);
  }
}
else{

}











})
app.listen(3000);
