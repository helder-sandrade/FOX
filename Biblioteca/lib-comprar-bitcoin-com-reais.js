//FUNÇÕES PARA PREENCHER COMPRAR BITCOIN COM REAIS
var script = "CODE:" + "\n"

// MEU PERFIL -> COMPRAR OU VENDER -> COMPRAR BTC AVANÇADO
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(2)>A" BUTTON=0' + "\n"
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(3)>A" BUTTON=0' + "\n"
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM>DIV>HEADER>H4>SMALL>A" BUTTON=0' + "\n"


// Essa função preenche o campo de valor em reais
function setRealValue_CBR (realCost){
	realCost = realCost.toString()
	//seleciona o campo quantos reais você quer gartar comprarndo bitcoins
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" BUTTON=0' + "\n"
	for (i=0; i<realCost.length;i++){
		script += 'EVENT TYPE=KEYDOWN SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" CHAR="' 	+ realCost[i] + "\"" + "\n"
		script += 'EVENT TYPE=KEYPRESS SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" CHAR="' 	+ realCost[i] + "\"" + "\n"
	}
	return script
}


// Essa função preenche o quanto você quer pagar por bitcoins
function setBitcoinValue_CBR (bitcoinCost){
	bitcoinCost = bitcoinCost.toString()
	//seleciona o campo onde você diz quanto quer pagar nos bitcoins
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" BUTTON=0' + "\n"
	for (i=0; i<bitcoinCost.length;i++){
		script += 'EVENT TYPE=KEYDOWN SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" CHAR="' 	+ bitcoinCost[i] + "\"" + "\n"
		script += 'EVENT TYPE=KEYPRESS SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" CHAR="' 	+ bitcoinCost[i] + "\"" + "\n"
	}
	return script
}

//Finaliza a compra clicando no botão comprar
function toColoseBuy_CBR(){
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>BUTTON" BUTTON=0' + "\n"
	return script
}



comprar = setBitcoinValue(31000)
comprar = setRealValue(13)
comprar = toColoseBuy()

ret = iimPlay(comprar)


