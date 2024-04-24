// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.




const express = require('express');
const path = require('path');
let count = 0;
const app = express();


function countRecord( url) {
    const bd =  require('./bd.json');
    const fs = require('fs');
    let count = 0;
    if (url == '/'){
        bd.countIndex =String(parseInt(bd.countIndex) + 1);
        count =  parseInt(bd.countIndex);
        fs.writeFile('./bd.json', JSON.stringify(bd) , (err) => {
            if (err){
                console.log(err);
            }
            console.log("файл записан");
        })
        console.log(count, bd);
    }else if (url == '/about'){
        bd.countAbout = String(parseInt(bd.countAbout) + 1);
        count =  parseInt(bd.countAbout);
        fs.writeFile('./bd.json', JSON.stringify(bd), (err) => {
            if (err){
                console.log(err);
            }
            console.log("файл записан");
        })
        console.log(count, bd);
    }else{
        console.log('чет не то верну 0');
        count = 0;
    }
    return count;
}

app.use((req,res,next) => {
    count = countRecord(req.url);
    next();
});

app.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, 'index.html'))
    res.send(`<a href="http://127.0.0.1:10000/about">Ссылка на страницу about</a>
    <h1>Счетчик = ${count}</h1>
    `)
});
app.get('/about', (req,res) => {
    // res.sendFile(path.join(__dirname, 'about.html'))
    res.send(`<a href="http://127.0.0.1:10000/">Ссылка на основную страницу</a>
    <h1>Счетчик = ${count}</h1>
    `)
})

app.listen(10000, () => {
    console.log('сервер запущен');
})