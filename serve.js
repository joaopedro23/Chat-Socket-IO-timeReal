const express = require('express');
const path = require('path');


const app = express();

const serve = require('http').createServer(app);
const io = require('socket.io')(serve);

app.use(express.static(path.join(__dirname,'public'))); 
app.set("views", path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html' )


app.use('/',(req,res)=> {
    res.render("index.html")
});

let messages = [];

io.on('connection', socket =>{
    console.log(`socket conectado ${socket.id}`);

    socket.emit('previousMenssages',messages)

    socket.on('sendMessage', data =>{
       messages.push(data);
       socket.broadcast.emit('recivedMessage',data)
       console.log(data)
    })
})


serve.listen(3000);