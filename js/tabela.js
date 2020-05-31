function geraTabela() {
    let variavel = document.getElementById("variavel").value;
    let elementos = [];
    let elExclusivos = [];
    let ocorrencias = {};
    let div = document.getElementById("divtabela");
    let tabela = document.createElement("table");
    let cabecalho = document.createElement("thead");
    let corpo = document.createElement("tbody");
    let linha = document.createElement("tr")
    let celula1 = document.createElement("td");
    let celula2 = document.createElement("td");
    let celula3 = document.createElement("td");
    let celula4 = document.createElement("td");
    let celula5 = document.createElement("td");
    let fac = 0;
    let facp = 0;
    let soma = 0;
    let qtdmoda = 0;
    let moda = "";
    let indexmediana = 0;
    let mediana = "";
    let tipovariavel = "";
 
    div.innerHTML = "";

    function sortFunction(a, b){
        return (a - b);
    }

    for (let elemento of document.getElementById("elementos").value.split(";")) {
        elementos.push(elemento.trim());
        if(! isNaN(elemento)){
            soma = soma + Number(elemento)
        }
    }

    indexmediana = elementos.length / 2;

    elExclusivos = [...new Set(elementos)];

    ocorrencias = elementos.reduce(function (obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        if(obj[item] > qtdmoda){
            qtdmoda = obj[item];
            moda = item;
        }
        return obj;
    }, {});
    
    if(isNaN(elementos[1])){
        tipovariavel = "Qualitativa"
    }else{
        if(elementos.length > 6 && ((elementos.length * 0.3) < elExclusivos.length)){
            tipovariavel = "Quantitativa Continua"
        }else{
            tipovariavel = "Quantitativa Discreta"
        }
    }
    
    celula1.appendChild(document.createTextNode(variavel));
    linha.appendChild(celula1);
    celula2.appendChild(document.createTextNode("Frequência simples"));
    linha.appendChild(celula2);
    celula3.appendChild(document.createTextNode("Frequência simples percentual"));
    linha.appendChild(celula3);
    celula4.appendChild(document.createTextNode("Frequência acumulada"));
    linha.appendChild(celula4);
    celula5.appendChild(document.createTextNode("Frequência acumulada percentual"));
    linha.appendChild(celula5);
    linha.setAttribute("align", "center");
    corpo.appendChild(linha);

    elExclusivos.sort(sortFunction);
    
    if(tipovariavel == "Quantitativa Discreta" || tipovariavel == "Qualitativa"){
        for (let elemento in elExclusivos) {
            let linha = document.createElement("tr")
            let celula1 = document.createElement("td");
            let celula2 = document.createElement("td");
            let celula3 = document.createElement("td");
            let celula4 = document.createElement("td");
            let celula5 = document.createElement("td");
            let fsp = parseFloat((ocorrencias[elExclusivos[elemento]] / elementos.length) * 100).toFixed(0);

            fac = parseInt(fac) + parseInt(ocorrencias[elExclusivos[elemento]]);
            facp = ((fac / elementos.length) * 100).toFixed(1) ;
            celula1.appendChild(document.createTextNode(elExclusivos[elemento]));
            linha.appendChild(celula1);
            celula2.appendChild(document.createTextNode(ocorrencias[elExclusivos[elemento]]));
            linha.appendChild(celula2);
            celula3.appendChild(document.createTextNode(fsp + "%"));
            linha.appendChild(celula3);
            celula4.appendChild(document.createTextNode(fac));
            linha.appendChild(celula4);
            celula5.appendChild(document.createTextNode(facp + "%"));
            linha.appendChild(celula5);
            linha.setAttribute("align", "center");
            corpo.appendChild(linha);
        }
    }else{
        elementos.sort(sortFunction);
        let at = elementos[elementos.length - 1] - elementos[0];
        let k = Math.sqrt(elementos.length).toFixed(0);
        let divisivel = false;
        let classes = 0;
        let intervalo = 0;
        let elInicial = 0;
        let elFinal = 0;

        while(divisivel == false){
            at = at + 1;
            if(at % (k - 1) == 0){
                classes = k -1;
                divisivel = true;
            }else if(at % k == 0){
                classes = k;
                divisivel = true;
            }else if(at % (k + 1) == 0){
                classes = k + 1;
                divisivel = true;
            }
        }

        intervalo = at / classes;
        elInicial = elementos[0];

        for(let i = 1; i <= classes; i++){
            elFinal = Number(elInicial) + Number(intervalo);
            let qtdElementos = 0;
            let linha = document.createElement("tr")
            let celula1 = document.createElement("td");
            let celula2 = document.createElement("td");
            let celula3 = document.createElement("td");
            let celula4 = document.createElement("td");
            let celula5 = document.createElement("td");;

            for(let elemento in elementos){
                if(elementos[elemento] >= elInicial && elementos[elemento] < elFinal){
                    qtdElementos = qtdElementos + 1;
                }
            }
            
            let fsp = parseFloat((qtdElementos / elementos.length) * 100).toFixed(0);
            
            fac = parseInt(fac) + parseInt(qtdElementos);
            facp = ((fac / elementos.length) * 100).toFixed(1) ;
            celula1.appendChild(document.createTextNode(elInicial + " |---- " + elFinal));
            linha.appendChild(celula1);
            celula2.appendChild(document.createTextNode(qtdElementos));
            linha.appendChild(celula2);
            celula3.appendChild(document.createTextNode(fsp + "%"));
            linha.appendChild(celula3);
            celula4.appendChild(document.createTextNode(fac));
            linha.appendChild(celula4);
            celula5.appendChild(document.createTextNode(facp + "%"));
            linha.appendChild(celula5);
            linha.setAttribute("align", "center");
            corpo.appendChild(linha);
            elInicial = elFinal;
        }

    }

    cabecalho.appendChild(document.createTextNode("Tabela de " + variavel));
    cabecalho.setAttribute("align", "center");
    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    div.appendChild(tabela);
    tabela.setAttribute("border", "2");
    tabela.setAttribute("align", "center");
    mediana = elementos[indexmediana - 1]

    div = document.getElementById("divtabela");
    tabela = document.createElement("table");
    corpo = document.createElement("tbody");
    linha = document.createElement("tr");
    celula1 = document.createElement("td");
    celula2 = document.createElement("td");
    celula3 = document.createElement("td");
    
    if(variavel == "Qualitativa"){
        celula1.appendChild(document.createTextNode("Média: Não existe"));
        linha.appendChild(celula1);
    }else{
        celula1.appendChild(document.createTextNode("Média: " + (soma / elementos.length).toFixed(1)));
        linha.appendChild(celula1);
    }
    celula2.appendChild(document.createTextNode("Moda: " + moda));
    linha.appendChild(celula2);
    celula3.appendChild(document.createTextNode("Mediana: " + mediana));
    linha.appendChild(celula3);
    tabela.appendChild(corpo);
    div.appendChild(tabela);
    tabela.setAttribute("border", "2");
    tabela.setAttribute("align", "center");
}
