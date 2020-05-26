var http = require('http');
var fs =require('fs');
var url=require('url');
var qs = require ('querystring');/*각각필요한 모듈 불러오기*/
function cartegorylist(filelist){/*퍼알 리스트에 관한 함수임 이걸로 카테고리연결하는데 쓰면됨*/
  var list='<ul>';
  for(var i=0;i<filelist.length;i++){
    list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list=list+'<ul>';
  return list;
}
function templit(title,list,body){/*본문함수*/
  return `<!doctype html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB222</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>
          ${body}
          </p>
        </body>
        </html>
    `;
}

var app= http.createsever(function(request,response){
  var _url = request.url;/*url모듈을 요청*/
  var queryData = url.parse(_url, true).query;/*queryData변수에 querystring의 데이터를 넣음*/
  var pathname=url.parse(_url, true).pathname;/*위와동일*/
if(pathname=='/')/*홈페이지 주소*/{
  if(queryData.id==undefined){/*querystring이 딱히 없이 접속하면 홈페이지로 이동*/
    fs.readdir("./category", function(err,filelist){
      var title='제목을 입력하세요';
      var description='본문 구현하지못했음';
      var list=categorylist(filelist);
      var tmp=templit(title,list,description);
      response.writeHead(200);
      response.end(tmp);
    });
  }
else{
  fs.readdir("./cartegory", function(err,filelist){/*카테고리폴더밑에있는 파일리스트를 읽음*/
    var list=cartegorylist(filelist);
    var title=queryData.id;
    fs.readFile(`cartegory/${queryData.id}`,'utf8',function(err, description){
      var tmp=templit(title,list,description);
      response.writeHead(200);
      response.end(tmp);
  });
});
}
}
else{
  response.writeHead(404);/* 정해진 카테고리이외의 링크로 접속하면  아무것도 뜨지않음  */
  response.end('Not found');
}
});
app.listen(3000);
