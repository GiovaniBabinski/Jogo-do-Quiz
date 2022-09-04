

const perguntas = [
    //pergunta0
    {
        pergunta: "Qual dessas linguagens é uma linguagem de marcação?",
        respostas: ["PHP", "JavaScript", "HTML", "Python"],
        correta: "resp2"
    },
    //pergunta1
    {
        pergunta: "Qual o significado da sigla HTML?",
        respostas: ["Hyper Tand Mark Language", "Hyper Text Markup Language", "Hey Text Marking Lang", "Hyper Text May Landing"],
        correta: "resp1"
    },
    //pergunta2
    {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1500", "1675", "1370", "1458"],
        correta: "resp0"
    },
    //pergunta3
    {
        pergunta: "Quantas vezes a seleção brasileira ficou fora da copa?",
        respostas: ["1", "3", "2", "Nenhuma"],
        correta: "resp3",
    }
]

let quantiaPerguntas = perguntas.length - 1;

let perguntasFeitas = [];



gerarPergunta(quantiaPerguntas);


function gerarPergunta(maxPerguntas) {
    //Gerar numero aleatorio para as perguntas da lista
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    //Mostrar no console qual pergunta sorteada
    console.log("A pergunta sorteada foi a " + aleatorio);


    //Verificar se a pergunta sorteada já foi feita
    if (!perguntasFeitas.includes(aleatorio)) {
        perguntasFeitas.push(aleatorio);

        //Preencher o campo HTML com os dados da questão sorteada
        let p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        $(".pergunta").html(p_selecionada);
        $(".pergunta").attr("data-indice", aleatorio)

        //Alimentar as respostas
        for (var i = 0; i < 4; i++) {
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }
        //Embaralhar as respostas

        let father = $("#btnResposta");
        let botoes = father.children();
        console.log(botoes);

        for (i = 1; i < botoes.length; i++) {
            father.append(botoes.eq(Math.floor(Math.random() * botoes.length)))

        }
    } else {
        //Se a pergunta já foi feita
        console.log("A pergunta já foi feita. Sorteando novamente.");
        if (perguntasFeitas.length < quantiaPerguntas + 1) {
            gerarPergunta(maxPerguntas);
        } else {
            console.log("Acabaram as perguntas.")
            $(".questao").addClass("oculto");
            $(".gameOver").removeClass("oculto");
            $("#mensagem").html("Parabéns! Você acertou todas!")
        }
    }

}

$(".resposta").click(function () {
    //Percorrer as respostas e desmarcar as outras classes selecionadas mantendo apenas uma
    if ($(".questao").attr("status") !== "travado")
        resetaBotoes();
    $(this).addClass("selecionada");
})


$("#confirm").click(function () {
    var indicePergunta = $(".pergunta").attr("data-indice");
    var respostaCerta = perguntas[indicePergunta].correta;
    //saber a resposta escolhida pelo usuario
    $(".resposta").each(function () {
        if ($(this).hasClass("selecionada")) {
            var respostaEscolhida = $(this).attr("id");

            if (respostaCerta == respostaEscolhida) {
                console.log("Acertoooou");
                proximaPergunta();
            } else {
                console.log("Errooou!!");
                $("#" + respostaCerta).addClass("correta");
                $("#" + respostaEscolhida).removeClass("selecionada");
                $("#" + respostaEscolhida).addClass("errada");
                $(".questao").attr("status", "travado");

                setTimeout(function () {
                    gameOver();
                    newGame();

                }, 2000)

            }
        }


    })
})

function newGame() {
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(quantiaPerguntas);

}

function proximaPergunta() {
    $(".resposta").each(function () {
        if ($(this).hasClass("selecionada"));
        $(this).removeClass("selecionada");
    });
    gerarPergunta(quantiaPerguntas);
}

function resetaBotoes() {
    $(".resposta").each(function () {
        if ($(this).hasClass("selecionada"));
        $(this).removeClass("selecionada");

        if ($(this).hasClass("correta"));
        $(this).removeClass("correta");

        if ($(this).hasClass("errada"));
        $(this).removeClass("errada"
        );
    });
}

function gameOver() {
    $(".questao").addClass("oculto");
    $(".gameOver").removeClass("oculto");

}

$(".novoJogo").click(function () {
    $(".questao").removeClass("oculto");
    $(".gameOver").addClass("oculto");
    newGame();
    alert("UM NOVO JOGO ESTÁ INICIANDO....")
})

















