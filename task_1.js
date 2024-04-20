// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');

let count = 0;

const server = http.createServer((req,res) => {
    if (req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        count = count + 1;
        res.end(`<a href="http://127.0.0.1:10000/about">Ссылка на страницу about</a>
        <h1>Счетчик = ${count}</h1>
        `)
    } 
    else if (req.url == '/about'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        count = count + 1;
        res.end(`<a href="http://127.0.0.1:10000/">Ссылка на основную страницу</a>
        <h1>Счетчик = ${count}</h1>
        `)
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end(`
        <h1>Чет не так 404</h1>
        `)
    }
});

const port = 10000;

server.listen(port, ()=> {
    console.log('Сервер запущен');
});