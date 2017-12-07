//Script para veririfar se existe alguma ordem pendente
ret = iimPlay("FOXBIT/VerificaOrdem.iim")
if (iimGetExtract() == ""){
	iimDisplay("NAO EXISTEM ORDENS")
} else {
	iimDisplay("EXISTEM ORDENS")
}