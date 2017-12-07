var mensagens = function (){
	var msg = {
		sucesso: function() {
			alert("sucesso");
		}
	};
	alert("mensagem");
}

mensagens(msg['sucesso'])