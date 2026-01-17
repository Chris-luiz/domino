class Jogo {
    NUMERO_TOTAL = 28;

    players = [];

    direcoes = {
        'n': [],
        's': [],
        'l': [],
        'o': [],
    }

    pedrasNaMesa = [];

    pedrasNasPontas = [];

    turno = 1;

    jogadorVez = 0;

    pilha = [];

    mesa = [];

    numerosSorteados = [];

    constructor() {
        for (var i = 0; i <= 6; i++) {
            for (var j = i; j <= 6; j++) {
                this.pilha.push(new Domino(i, j))
            }
        }
    }

    adicionarPlayer(player) {
        this.players.push(player);
    }

    pegarNumeroAleatorio() {
        let numeroAleatorio = Math.floor(Math.random() * (this.NUMERO_TOTAL - this.numerosSorteados.length));

        while (this.numerosSorteados.includes(numeroAleatorio)) {
            numeroAleatorio = Math.floor(Math.random() * 28);
        }

        this.numerosSorteados.push(numeroAleatorio);

        return numeroAleatorio;
    }

    pegarMao() {
        let mao = [];

        for (let i = 1; i <= 7; i++) {
            let numeroAleatorio = this.pegarNumeroAleatorio();
            mao.push(this.pilha[numeroAleatorio]);
            delete this.pilha[numeroAleatorio];
            this.pilha.filter(item => item !== null);
        }

        return mao;
    }

    proximoJogador() {
        if (this.jogadorVez == 3) {
            this.jogadorVez = 0;
        } else {
            this.jogadorVez++;
        }
    }

    proximoTurno() {
        this.turno++;
        this.proximoJogador();
    }

    adicionarPedraNaMesa(metaData) {
        this.pedrasNaMesa.push(metaData);
    }

    adicionarPedraNaPonta(pedra) {
        if (this.pedrasNaMesa.length == 4) {

            return;
        }

        this.pedrasNasPontas.push(pedra);
    }

    adicionarPedraEmDirecao(pedra, direcao, todos = false) {
        if (todos) {
            this.direcoes['n'].push(pedra);
            this.direcoes['s'].push(pedra);
            this.direcoes['l'].push(pedra);
            this.direcoes['o'].push(pedra);
            return;
        }
        this.direcoes[direcao].push(pedra);
    }

    buscarDomino(direita, esquerda) {
        const player = this.players.find(player => {
            return player.buscarPedra(direita, esquerda)
        });

        return player.buscarPedra(direita, esquerda);
    }

    contarPontos() {
        this.pedrasNasPontas.map(pedraAtiva => {

        })
    }

    primeiroTurno() {
        return this.turno == 1;
    }

    posicionarDomino(divPlaceholder, lado) {
        const rects = divPlaceholder.getBoundingClientRect();

        const orientacao = divPlaceholder.getAttribute('data-lado');

        if (orientacao == 'n') {
            const centroX = rects.left;
            const centroY = rects.top;

            dominoMovido.style.position = 'fixed';
            dominoMovido.style.left = `${centroX}px`;
            dominoMovido.style.top = `${centroY}px`;
            dominoMovido.style.transform = lado == 'esquerda' ? "rotate(180deg)" : 'rotate(0)';
        }

        if (orientacao == 'l') {
            const centroX = rects.left + (rects.height / 2);
            const centroY = rects.top + (rects.height - (rects.width / 2));

            dominoMovido.style.position = 'fixed';
            dominoMovido.style.left = `${centroX}px`;
            dominoMovido.style.top = `${centroY}px`;

            dominoMovido.style.transform = lado == 'esquerda' ? "rotate(-90deg)" : 'rotate(90deg)';
        }

        if (orientacao == 's') {
            const centroX = rects.left;
            const centroY = rects.top;

            dominoMovido.style.position = 'fixed';
            dominoMovido.style.left = `${centroX}px`;
            dominoMovido.style.top = `${centroY}px`;
            dominoMovido.style.transform = lado == 'esquerda' ? "rotate(0deg)" : "rotate(180deg)";
        }

        if (orientacao == 'o') {
            const centroX = rects.left + (rects.height / 2);
            const centroY = rects.top - ((rects.width / 2) / 2);

            dominoMovido.style.position = 'fixed';
            dominoMovido.style.left = `${centroX}px`;
            dominoMovido.style.top = `${centroY}px`;
            dominoMovido.style.transform = lado == 'esquerda' ? "rotate(90deg)" : "rotate(-90deg)";
        }

        dominoMovido.removeAttribute('draggable')
        // {
        //     "direcao": "norte",
        //     "lado": "esquerda",
        //     "numero": 6,
        //     "div": {}
        // }

        return;
    }

    validarJogada(domino) {
        if (this.primeiroTurno()) {
            if (domino.direita == 6 && domino.esquerda == 6) {
                return {
                    direcao: "vertical",
                    ladoAtivo: 6,
                    ladoAtivoNumero: 6,
                    sentido: "vertical",
                }
            } else {
                return false;
            }
        }

        const validacao = placeholder.validar(domino);

        if (validacao) {
            this.posicionarDomino(validacao.div, validacao.lado);

            return {
                direcao: validacao.direcao,
                ladoAtivo: validacao.lado == 'esquerda' ? 'direita' : 'esquerda',
                ladoAtivoNumero: validacao.ladoAtivo,
                sentido: validacao.sentido,
            }
        }
    }

    validarPontuacao() {
        const totalNaMesa = this.pedrasNaMesa.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.ladoAtivoNumero
        }, 0);

        if (totalNaMesa % 5 == 0) {
            return totalNaMesa;
        }

        return false;
    }

    efetuarJogada(metadata, direcao) {

        if (this.primeiroTurno()) {
            this.adicionarPedraEmDirecao(metadata, 's', true);
        } else {
            this.adicionarPedraEmDirecao(metadata, direcao);
        }

        this.adicionarPedraNaMesa(metadata);
        this.adicionarPedraNaPonta(metadata);

        const fezPonto = this.validarPontuacao();
        if (fezPonto) {
            this.players[this.jogadorVez].pontuar(fezPonto);


            // this.players.map(player => {
            //     console.log(`${player.nome} tem: ${player.pontos}`);
            // })
        }

        this.players[this.jogadorVez].mao = this.players[this.jogadorVez].mao.filter(domino => {
            return domino.direita != metadata.ladoDireito || domino.esquerda != metadata.ladoEsquerdo;
        });

        if (this.players[this.jogadorVez].mao.length == 0) {
            alert('FIM DO JOGO');
        }
    }
}
