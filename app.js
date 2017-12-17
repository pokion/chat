var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');


app.use(express.static('public'));


app.get('/',(req,res)=>{
	res.render('chat')
})

let peoples = []
io.on('connection', (socket)=>{
	console.log('zalogowal sie '+socket.id)
	peoples.push(socket.id)

	io.emit('people', peoples)

	socket.on('wiadomosc', (msg)=>{
		socket.broadcast.emit('wiadomosc', msg)
	})


	socket.on('disconnect', ()=>{
		console.log('wylogowal sie '+socket.id)

		let index = peoples.indexOf(socket.id)

		peoples.splice(index,1)

		io.emit('peopleLeave', peoples)


	})
})




var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
	ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);