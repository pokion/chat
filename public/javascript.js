let socket = io();
/*łączenie z serverem*/
socket.on('connect',()=>{
	$('.you').html(socket.id)

/*wypisuje ludzi online*/
	socket.on('people', (msg)=>{
		$('.noone').remove()
		$('#people').append('<div class="noone"></div>')
		msg.forEach((element,index,array)=>{
			if(element !== socket.id){
				$('.noone').append('<div class="online">'+element+'</div>')
			}
		})
	})
/*usuwa ludzi offline*/ 
	socket.on('peopleLeave', (msg)=>{
		$('.noone').remove()
		$('#people').append('<div class="noone"></div>')
		msg.forEach((element,index,array)=>{
			if(element !== socket.id){
				$('.noone').append('<div class="online">'+element+'</div>')
			}
		})

	})
	

})



/*wysyła wiadomość do innych*/
	$('form').submit(()=>{
		socket.emit('wiadomosc', $('input').val() )	
		$('ul').append('<li class="your">'+$('input').val()+'</li>')
		$('input').val('')
		return false;
	})
	/*pobiera wiadomosc od ludzi*/
	socket.on('wiadomosc', (msg)=>{
		$('ul').append('<li class="enemy">'+msg+'</li>')
	})



