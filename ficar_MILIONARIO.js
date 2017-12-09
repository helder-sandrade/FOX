/*
*/
var log = ""
var price = 0
var lastPurchaseValue = 0
var nextSaleValue = 0

var ordem = true
var enableSale = false
var enablePurchase = true

var money = 200
var profit = 400
var profitPurchase = 0.997553189010323 		
var profitSale = 1.00104863328129 		
var waitTime = 2

//---------------------- implementação de fila
var queue = []; //fila fifo
var queueSize = 30; //tamanho da fila
var proportionPurchase = 70;
var proportionSale = 40;
var queuePermit = false;
//função para criação da fila
function setQueue(price){
	var control = true;
	var maxValue = 0;
	var minValue = 0
	
	//Verificando se já existe o valor na fila
	for(j=0;j<queue.length;j++){
		if(queue[j] == price){
			control = false;
		}
	}
	
	//adiciona valores a fila
	if(control){
		if(queue.length == queueSize){ //verifica o tamanho da fila
			queue.shift(); //remove primeiro valor
			queue.push(price); //adiciona valor ao final da fila
		} else {
			queue.push(price); //adiciona valor ao final da fila 
		}
	}
	
	//define o maior e o menor valor contido na fila
	maxValue = Math.max.apply(null, queue); //define o maior valor
	minValue = Math.min.apply(null, queue); //define o menor valor
	setPercentBuy(minValue, maxValue, price);
	
	
}



/*
Essa função tem utiliza o valor que você quer lucrar e ira balancear 
a esse valor entre a compra e a venda.
no caso de cotações baixas sera emitido uma ordem de compra no valor atual
e a venda com 100% do valor que queremos de lucro.
Em caso de cotações altas ou muito proximas do valor mais alto da fila
não serão emitidos ordens de compra.
Em caso de cotações entre o valor mais baixo e o mais alto sera emitido a ordem 
com os valores padrões de compra a 70% do valor atual e venda 40% a cima do valor atual.

*/
function setPercentBuy(lowerValue, highestValue, currentValue){

	
	var lower 	= parseInt(lowerValue + (lowerValue* 0.004210526));//define menor valor 0,005% a cima do minimo
	var highest = parseInt(highestValue - (highestValue* 0.006224));//define maior valor 0,008% a baixo do maximo
	
	if(queue.length > (queueSize*0.5)){ //verifica se existe valores suficiente na fila para ser calculado
		queuePermit = true; //permite que seja emitido ordens
		if(currentValue >= highest){ //verifica se o valor corrente esta muito alto
			if(enableSale == false ) {
				queuePermit = false;
			}
		} else {
			if(currentValue <= lower) {//verifica se o valor corrente está bem baixo
				proportionPurchase = 0; //atribui 0% para a compra ou seja emite a compra com o valor atual
				profitSale = 100;//joga o lucro desejado todo para a venda 
		} else {
				proportionPurchase = 70; //emite uma ordem com 70% do valor do lucro a menos no valor corrente
				profitSale = 40;//emite uma ordem com 40% do valor do lucro a cima do valor corrente
			}
		}
	} 
}







//Função para ajuste das proporcões
function setProportionAdjust(btcPrice){

	var payLess = profit * proportionPurchase/100
	var receiveMore = profit * proportionSale/100
	var forHowMuchToBuy = btcPrice - payLess
	var forHowMuchToSell = btcPrice + receiveMore
	var purchaseFactor = forHowMuchToBuy / btcPrice
	var sellingFactor = forHowMuchToSell / btcPrice
	
	profitPurchase = purchaseFactor
	profitSale = sellingFactor
	
}




function wrl (logging){
	log +=  logging.toString().toUpperCase() + "\n"
	ret = iimDisplay(log)
}
	
	
//---------------------FUNÇÕES PARA COMPRA DE BITCOINS---------------------------

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

//-----------------------------------------------------------------------
	
//---------------------FUNÇÕES PARA VENDA DE BITCOINS---------------------------
// Essa função preenche o campo de valor em reais
function setRealValue_VBR (realCost){
	realCost = realCost.toString()
	//seleciona o campo quantos reais você quer gartar comprarndo bitcoins
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" BUTTON=0' + "\n"
	for (i=0; i<realCost.length;i++){
		script += 'EVENT TYPE=KEYDOWN SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" CHAR="' 	+ realCost[i] + "\"" + "\n"
		script += 'EVENT TYPE=KEYPRESS SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(3)>DIV>DIV>INPUT" CHAR="' 	+ realCost[i] + "\"" + "\n"
	}
	return script
}


// Essa função preenche o quanto você quer pagar por bitcoins
function setBitcoinValue_VBR (bitcoinCost){
	bitcoinCost = bitcoinCost.toString()
	//seleciona o campo onde você diz quanto quer pagar nos bitcoins
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" BUTTON=0' + "\n"
	for (i=0; i<bitcoinCost.length;i++){
		script += 'EVENT TYPE=KEYDOWN SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" CHAR="' 	+ bitcoinCost[i] + "\"" + "\n"
		script += 'EVENT TYPE=KEYPRESS SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV>DIV:nth-of-type(2)>DIV>DIV>INPUT" CHAR="' 	+ bitcoinCost[i] + "\"" + "\n"
	}
	return script
}

//Finaliza a compra clicando no botão comprar
function toColoseBuy_VBR(){
	script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>BUTTON" BUTTON=0' + "\n"
	return script
}
//------------------------------------------------------------------------
	
	
	
	
//Inicio do script que ficara rodando	

for(i=0; i<5000000; i++){
	ordem = false
	ret = iimPlay("FOX/UltimaCotacaoBtc.iim"); //Script para monitorar o preço do bitcoin
	price = iimGetExtract(0).replace('R$ ',''); //Registra a cotação atual do Bitcoin
	price = parseInt(price.replace('.',''));
		
	setQueue(price); //inicia a criação da fila
	if(queuePermit == false ){ //passa para o proximo passo for sem executar o que esta a baixo
		ret = iimPlay("CODE: WAIT SECONDS=" + waitTime )
		continue;
	}	
	setProportionAdjust(price); //Inicia o auto calculo dos ganhos
	
	//Script para veririfar se existe alguma ordem pendente
	ret = iimPlay("FOX/VerificaOrdem.iim");
		if (iimGetExtract() == ""){
			/* Verifica se a compra está permitida lastPurchaseValue só é alterado quando a compra está habilitada
			lastPurchaseValue é o valor que será pago pelos bitcoins com descontando 1% de taxa */
			if(ordem == false && enablePurchase) {
				//Desativa novas compras
				enablePurchase = false
				//Valor que será pago pelos Bitcoins
				lastPurchaseValue = parseInt(price * profitPurchase)
				//Valor que sera cobrado pelos Bitcoins com acrescimo de 3%
				nextSaleValue = parseInt(price * profitSale)
				//EMITE A ORDEM DE COMPRA PARA BITCOINS
					var script = "CODE:" + "\n"
					// MEU PERFIL -> COMPRAR OU VENDER -> COMPRAR BTC AVANÇADO
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(2)>A" BUTTON=0' + "\n"
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(3)>A" BUTTON=0' + "\n"
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(3)>FORM>DIV>HEADER>H4>SMALL>A" BUTTON=0' + "\n"
						comprar = setBitcoinValue_CBR(lastPurchaseValue)
						comprar = setRealValue_CBR(money)
						comprar = toColoseBuy_CBR()
						ret = iimPlay(comprar)
							z = "";
							z+= "cotacao:	" +price+ "\n";
							z+= "compra:	" +lastPurchaseValue+ "\n";
							z+= "venda:	" +nextSaleValue+ "\n";
							z+= "-------------\n";
							wrl(z)//gera log da compra
				//Habilita novas vendas
				enableSale = true
				ordem = true
			}
			if(ordem == false && enableSale) {
				//Desativa novas vendas
				enableSale = false
				//EMITE A ORDEM DE COMPRA PARA BITCOINS
					var script = "CODE:" + "\n"
					// LIVRO DE OFERTAS -> COMPRAR OU VENDER -> VENDER BTC AVANÇADO
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(4)>A" BUTTON=0' + "\n"
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV>DIV>DIV:nth-of-type(2)>DIV>UL>LI:nth-of-type(3)>A" BUTTON=0' + "\n"
						script += 'EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(3)>DIV:nth-of-type(6)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(6)>DIV>DIV:nth-of-type(4)>FORM>DIV>HEADER>H4>SMALL>A" BUTTON=0' + "\n"
						comprar = setBitcoinValue_VBR(nextSaleValue)
						comprar = setRealValue_VBR(money)
						comprar = toColoseBuy_VBR()
						ret = iimPlay(comprar)
				//Habilita novas compras
				enablePurchase = true
			}
		}
	
	//ret = iimDisplay(log)
	ret = iimPlay("CODE: WAIT SECONDS=" + waitTime )
}





	


	
	

