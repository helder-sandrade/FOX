var fila = []
var tamanhoFila = 10
var lucroCompra = 0
var lucroVenda = 0
var ordem  = false

a = ""

function log(texto){
	ret = iimDisplay(texto)
}


function decidePorcentagens(menorValor, maiorValor, atualValor){
	var minv = parseInt(menorValor * 1.0011);
	var maxv = parseInt(maiorValor * 0.9970);
	a = ""
	a += "valor atualValor	" + atualValor + "\n"
	a += "maior valor	" + maiorValor     + "min: " + maxv + "\n"
	a += "menor valor	" + menorValor     + "min: " + minv + "\n"
	a += "--------------------------------"+ "\n"
	
	if(fila.length > (tamanhoFila*0.8)){
		if(atualValor >= maxv){
			a += "nao compra";
			log(a)
		} else {
		if(atualValor < minv){
			a += "baixa";
			log(a)
		} else {
			a += "normal";
			log(a)
		}
		}
	}
}


function filaValores(valor){
	var controle = true
	var maiorValor = 0
	var menotValor = 0
	var mediaValor = 0
	
	for(j=0; j < fila.length; j++){
		if(fila[j] == valor){
			controle = false;
		}
	}
	
	if(controle) {
		if(fila.length == tamanhoFila){
			fila.shift()
			fila.push(valor)
		} else {
			fila.push(valor)
		}
	}
	controle = true
	maiorValor = Math.max.apply(null, fila)
	menorValor = Math.min.apply(null, fila)
	decidePorcentagens(menorValor, maiorValor, valor)
	
}

for(i=0;i<30000;i++){
	ret = iimPlay("FOXBIT/UltimaCotacaoBtc.iim")
	price = iimGetExtract(0).replace('R$ ','')
	price = parseInt(price.replace('.',''))
	filaValores(price)
	ret = iimPlay("CODE: WAIT SECONDS=5")
}