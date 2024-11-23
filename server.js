import express from "express";
import con from "./connecting.js"

const app = new express();

app.get('/SELECT', (req, res) => {
    
    con.query('select * from local', (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})

app.get('/INSERT', (req, res) => {
    con.query('INSERT INTO local(nome, capacidade) VALUES ("Lais",120)', (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})

app.get('/', (req, res) => {
    res.send("OI");
})

app.listen('3030', () => {
    console.log('oi 2');
})
