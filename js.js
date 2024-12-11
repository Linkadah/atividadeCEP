function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};

function pesquisaCidadeRua(cdd, rua) {
    //Verifica se campo cep possui valor informado.
    if (cdd != "" && rua !="") {
    
            //Cria um elemento javascript.
            var script = document.createElement('script');
    
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/PR/'+ cdd +'/'+ rua +'/json/?callback=meu_callback2';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
    
        
    } else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function meu_callback2(conteudo) {
    console.log(conteudo);
    const lista = document.getElementById('lista');

    for(let i = 0; i<conteudo.length; i++){   

        lista.innerHTML += `<li class="list-group-item"> Cep: ${conteudo[i].cep}<br> Rua: ${conteudo[i].logradouro}<br> Bairro: ${conteudo[i].bairro}</li>
        <br>`;
    }
   
};