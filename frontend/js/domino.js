class Domino {
    constructor(direita, esquerda) {
        if (direita < 0 || direita > 6 || esquerda < 0 || esquerda > 6) {
            throw new Error("Escolha números entre 0 e 6");
        }

        this.direita = direita;
        this.esquerda = esquerda;
    }

    buscar(direita, esquerda) {
        return (this.direita == direita && this.esquerda == esquerda);
    }

    renderizar() {
        const html = document.createElement('div');
        html.classList.add('domino');
        html.setAttribute('draggable', true)
        html.setAttribute('data-direita', this.direita);
        html.setAttribute('data-esquerda', this.esquerda);

        let divEsquerda = document.createElement('div');
        divEsquerda.classList.add("esquerda");

        if (this.esquerda > 0) {
            for (let i = 1; i <= this.esquerda; i++) {
                let ponto = document.createElement('div');
                ponto.classList.add('ponto');
                divEsquerda.appendChild(ponto);
            }
        }


        let divDireita = document.createElement('div');
        divDireita.classList.add("direita");

        if (this.direita > 0) {
            for (let i = 1; i <= this.direita; i++) {
                let ponto = document.createElement('div');
                ponto.classList.add('ponto');
                divDireita.appendChild(ponto);
            }
        }

        let divisorElement = document.createElement('div');
        divisorElement.classList.add('divisor');

        html.appendChild(divEsquerda);
        html.appendChild(divisorElement);
        html.appendChild(divDireita);

        return html;
    }
}
