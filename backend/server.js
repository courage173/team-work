import express from 'express';

const server = express();

server.use('/',(req,res)=>{
    res.send("Hello World")
})


const Port = 3000;

server.listen(Port,()=> console.log(`Port running on ${Port}`))