class Placeholder {
    className = 'placeholder';

    direcao = {
        'n': null,
        's': null,
        'l': null,
        's': null,
    }

    adicionarDirecao(direcao, div, valor) {
        this.direcao[direcao] = {
            valor: valor,
            div: div,
        };
    }

    norte(jogo) {
        const domino = jogo.direcoes.n[jogo.direcoes.n.length - 1];
        const rects = domino.html.getBoundingClientRect();

        const centroY = rects.top - rects.height;
        const centroX = rects.left;

        const valor = domino.ladoAtivo == 'direita'
            ? domino.ladoDireito
            : domino.ladoEsquerdo;

        return {
            direcao: 'n',
            x: `${centroX}px`,
            y: `${centroY}px`,
            rotate: false,
            valor: valor,
            sentido: 'vertical',
        }
    }

    sul(jogo) {
        const domino = jogo.direcoes.s[jogo.direcoes.s.length - 1];
        const rects = domino.html.getBoundingClientRect();

        const centroY = rects.top + rects.height;
        const centroX = rects.left;

        const valor = domino.ladoAtivo == 'direita'
            ? domino.ladoDireito
            : domino.ladoEsquerdo;

        return {
            direcao: 's',
            x: `${centroX}px`,
            y: `${centroY}px`,
            rotate: false,
            valor: valor,
            sentido: 'vertical',
        }
    }

    leste(jogo) {
        const domino = jogo.direcoes.l[jogo.direcoes.l.length - 1];
        const rects = domino.html.getBoundingClientRect();

        let centroY;
        let centroX;

        if (domino.posicao == 'vertical') {
            centroY = rects.top + (rects.height - (rects.width * 2));
            centroX = rects.left + (rects.height - (rects.width / 2));
        } else {
            centroY = rects.top + (rects.height - (rects.width - (rects.width / 4)));
            centroX = rects.left + (rects.height + rects.height + (rects.width / 4));
        }

        const valor = domino.ladoAtivo == 'direita'
            ? domino.ladoDireito
            : domino.ladoEsquerdo;

        return {
            direcao: 'l',
            x: `${centroX}px`,
            y: `${centroY}px`,
            rotate: true,
            valor: valor,
            sentido: 'horizontal',
        }
    }

    oeste(jogo) {
        const domino = jogo.direcoes.o[jogo.direcoes.o.length - 1];
        const rects = domino.html.getBoundingClientRect();

        let centroX;
        let centroY;

        if (domino.posicao == 'vertical') {
            centroY = rects.top + (rects.height - (rects.width * 2));
            centroX = rects.left - (rects.height - (rects.width / 2));
        } else {
            centroY = rects.top + (rects.height - (rects.width - (rects.width / 4)));
            centroX = rects.left - (rects.height + (rects.width / 4));
        }


        const valor = domino.ladoAtivo == 'direita'
            ? domino.ladoDireito
            : domino.ladoEsquerdo;

        return {
            direcao: 'o',
            x: `${centroX}px`,
            y: `${centroY}px`,
            rotate: true,
            valor: valor,
            sentido: 'horizontal',
        }
    }

    validar(domino) {
        if (this.direcao.n.valor == domino.direita) {
            return {
                direcao: 'n',
                lado: "direita",
                numero: domino.direita,
                div: this.direcao.n.div,
                ladoAtivo: domino.esquerda,
                sentido: "vertical"
            };
        }

        if (this.direcao.n.valor == domino.esquerda) {
            return {
                direcao: 'n',
                lado: "esquerda",
                numero: domino.esquerda,
                div: this.direcao.n.div,
                ladoAtivo: domino.direita,
                sentido: "vertical"
            };
        }

        if (this.direcao.l.valor == domino.esquerda) {
            return {
                direcao: 'l',
                lado: "esquerda",
                numero: domino.esquerda,
                div: this.direcao.l.div,
                ladoAtivo: domino.direita,
                sentido: "horizontal"
            };
        }

        if (this.direcao.l.valor == domino.direita) {
            return {
                direcao: 'l',
                lado: "direita",
                numero: domino.direita,
                div: this.direcao.l.div,
                ladoAtivo: domino.esquerda,
                sentido: "horizontal"
            };
        }


        if (this.direcao.s.valor == domino.esquerda) {
            return {
                direcao: 's',
                lado: "esquerda",
                numero: domino.esquerda,
                div: this.direcao.s.div,
                ladoAtivo: domino.direita,
                sentido: "vertical"
            };
        }

        if (this.direcao.s.valor == domino.direita) {
            return {
                direcao: 's',
                lado: "direita",
                numero: domino.direita,
                div: this.direcao.s.div,
                ladoAtivo: domino.esquerda,
                sentido: "vertical"
            };
        }

        if (this.direcao.o.valor == domino.direita) {
            return {
                direcao: 'o',
                lado: "direita",
                numero: domino.direita,
                div: this.direcao.o.div,
                ladoAtivo: domino.esquerda,
                sentido: "horizontal"
            };
        }

        if (this.direcao.o.valor == domino.esquerda) {
            return {
                direcao: 'o',
                lado: "esquerda",
                numero: domino.esquerda,
                div: this.direcao.o.div,
                ladoAtivo: domino.direita,
                sentido: "horizontal"
            };
        }

        console.log("Não retornou");
    }

    limparPlaceholders() {
        document.querySelectorAll('[data-placeholder]').forEach(item => item.remove());
    }

    mostrarPlaceholders(direita, esquerda) {
        document.querySelectorAll('[data-placeholder]').forEach(item => {
            if (item.getAttribute('data-valor-aceito') == direita || item.getAttribute('data-valor-aceito') == esquerda) {
                item.classList.remove('d-none')
            }
        });
    }

    esconderPlaceholders() {
        document.querySelectorAll('[data-placeholder]').forEach(item => item.classList.add('d-none'));
    }

    gerarPlaceholders(jogo) {

        const pedraNorte = this.norte(jogo);
        const pedraSul = this.sul(jogo);
        const pedraLeste = this.leste(jogo);
        const pedraOeste = this.oeste(jogo);

        this.limparPlaceholders();

        [pedraNorte, pedraSul, pedraLeste, pedraOeste].forEach(direcao => {

            let div = document.createElement('div');
            div.classList.add(this.className);
            div.setAttribute('data-placeholder', true);
            div.setAttribute('data-lado', direcao.direcao);
            div.setAttribute('data-sentido', direcao.sentido);
            div.setAttribute('data-valor-aceito', jogo.primeiroTurno() ? 6 : direcao.valor);
            div.classList.add('d-none');
            div.style.position = 'fixed';
            div.style.left = direcao.x
            div.style.top = direcao.y
            div.style.transform = direcao.rotate ? 'rotate(90deg)' : '';

            if (jogo.primeiroTurno()) {
                this.adicionarDirecao(direcao.direcao, div, 6);
            } else {
                this.adicionarDirecao(direcao.direcao, div, direcao.valor);
            }

            meio.appendChild(div);
        })
    }
}
