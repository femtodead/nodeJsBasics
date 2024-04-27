
const { error } = require('console');
const express = require('express');
const fs = require('fs');
const joi = require('joi');
const path = require('path');

const pathFile = path.join(__dirname, 'users.json');

const scheme = joi.object({
    ferstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    sity: joi.string().min(3),
    age: joi.number().min(0).max(150).required()
})
const app = express();


app.use(express.json())

app.get('/users', (req,res) =>{
    const users = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    res.send(
        users
    )
    
})

app.get('/users/:id',(req,res) =>{
    const users = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    const user = users.find((elem) => elem.id == Number(req.params.id))
    if (user){
        res.send({
            user
        })
    }else{
        res.send({error: "err 400"})
    }
})

app.put('/users/:id',(req,res) =>{
    const result = scheme.validate(req.body);
    if (result.error){
        return res.send({error: result.error.details})
    }

    const users = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    const user = users.find((elem) => elem.id == Number(req.params.id))
    if (user){
        user.ferstName = req.body.ferstName;
        user.secondName = req.body.secondName;
        user.sity = req.body.sity;
        user.age = req.body.age;
        fs.writeFileSync(pathFile, JSON.stringify(users))
        res.send({
            user
        })
    }else{
        res.send({error: "err 400"})
    }
}

)

app.post('/users',(req,res) =>{
    const result = scheme.validate(req.body);
    if (result.error){
        return res.send({error: result.error.details})
    }
    const users = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    
        users.push({
        id:users.length+1,
        ferstName:req.body.ferstName,
        secondName:req.body.secondName,
        sity:req.body.sity,
        age:req.body.age
        });
        fs.writeFileSync(pathFile, JSON.stringify(users))
        res.send({
            id:users.length,
            ferstName:req.body.ferstName,
            secondName:req.body.secondName,
            sity:req.body.sity,
            age:req.body.age
        })

}
)

app.delete('/users/:id',(req,res) =>{
    const users = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
    const userIndex = users.findIndex((elem) => elem.id == Number(req.params.id))
    if ( userIndex => 0){
        if (userIndex == users.length-1){
            users.splice(userIndex, 1);
        }else{
            users.splice(userIndex, 1);
            for (let index = 0; index < users.length; index++) {
                users[index].id = index+1;
            }
        }

        fs.writeFileSync(pathFile, JSON.stringify(users))
        res.send({
            status: 'ok'
        })
    }else{
        res.send({error: "err 400"})
    }
}

)

app.listen(10000, () => {
    console.log('сервер запущен');
})