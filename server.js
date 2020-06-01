var http = require('http');
var fs = require('fs');
var url= require('url');
var qs = require('querystring');/*각각필요한 모듈 불러오기*/
function cartegorylist(filelist){/*퍼알 리스트에 관한 함수임 이걸로 카테고리연결하는데 쓰면됨*/
  var list='<ul>';
  for(var i=0;i<filelist.length;i++){
    list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list=list+'<ul>';
  return list;
}
function templit(title,list,body){/*본문함수*//*<!DOCTYPE html>*/

  return `<!doctype html>
        <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          ${list}
          <h2>${title}</h2>
          <p>
          ${body}
          </p>
        </body>
        </html>
    `;
}

var app = http.createServer(function(request,response){
    var _url = request.url;/*url모듈을 요청*/
  var queryData = url.parse(_url, true).query;/*queryData변수에 querystring의 데이터를 넣음*/
  var pathname=url.parse(_url, true).pathname;/*위와동일*/
if(pathname=='/')/*홈페이지 주소*/{
  if(queryData.id==undefined){/*querystring이 딱히 없이 접속하면 홈페이지로 이동*/
    fs.readdir("./category", function(err,filelist){
      var title='pket 프켓';

      var tmp=`<!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <title>pket 프켓</title>
        </head>
          <style type="text/css">
          #divCategory{
            background:#FFD9EC;
            color: #tff;
            padding: 15px;
            width: 250px;
            margin: 50px auto;
            float: left;
          }
          #divCategory ul{
            padding:0;
            list-style: none;
          }
          #divCategory ul li a{
            padding: 15px;
            display: block;
            color:#000;
            text-decoration: none;
          }
          #divCategory ul li:first-child{border-top: none;}
          #divCategory ul li:last-child{border-bottom: none;}
          #divCategory ul li a:hover{background: #FFA7A7}
          </style>
        <body>
          <a href="main.html"><img src="pket main.jpg" width="30%"></a>
            <div id="divCategory">
            <h2>category</h2>
            <ul>
              <li><a href="?id=의류">의류</a></li>
              <li><a href="?id=스포츠">스포츠</a></li>
              <li><a href="?id=책">책</a></li>
              <li><a href="?id=자취">자취</a></li>
            </ul>
              </div>
        </body>
      </html>`;
      response.writeHead(200);
      response.end(tmp);
    });
  }
else if(queryData.id=='의류'){
  fs.readdir('./category/의류',function(error, filelist){
    var list='<ul>';
    var i=0;
    while(i<filelist.length){
      list=list+`<li><a href="/?id=${filelist[i]}" target="_blank">${filelist[i]}</a></li>`;
      i=i+1;
    }
    list=list+'<ul>';
  var tmp=`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>의류</title>
      <style type="text/css">
      li{float:left;list-style:none;margin:15px;}
      li a{display:block;width:170px;height:50px;background:#a00;color:#fff;border:1px;font-size:20px;text-align:center;padding-center:30px;text-decoration:none;}
      li a span{display:block;}
      li a:hover{background:#810;text-decoration:none;}
      </style>
    </head>

    <body>
      <h1><font face="맑은 고딕"><p style="text-align: center">의류</font></h1>
      <ul>

        ${list}

      </ul>
    </body>
  </html>
`
  response.writeHead(200);
  response.end(tmp);
});
}
else{
  console.log(queryData.id)
    fs.readFile(`category/의류/${queryData.id}`,'utf8',function(err, description){
      var tmp=`${description}`;
      response.writeHead(200);
      response.end(tmp);
  });
};
}
else{
  response.writeHead(404);/* 정해진 카테고리이외의 링크로 접속하면  아무것도 뜨지않음  */
  response.end('Not fond');
}
});
app.listen(3000);
