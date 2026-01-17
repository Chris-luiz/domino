class Player {
    nome = "";
    mao = []
    numeroVez = null;
    pontos = 0;

    constructor(mao, numeroVez) {
        this.mao = mao;
        this.numeroVez = numeroVez;
    }

    renderizarMao() {
        let divPlayer1 = document.querySelector(`#player_${this.numeroVez}`);

        this.mao.forEach(pedra => {
            divPlayer1.appendChild(pedra.renderizar());
        });
    }

    verMao() {
        return this.mao;
    }

    buscarPedra(direita, esquerda) {
        return this.mao.find(pedra => pedra.buscar(direita, esquerda));
    }

    pontuar(pontos) {
        this.pontos += pontos;
    }
}
