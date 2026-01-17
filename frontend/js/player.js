class Player {
    nome = "";
    pedras = []
    vez = null;
    pontos = 0;

    constructor(nome, pedras, pontos, vez) {
        this.nome = nome;
        this.pedras = pedras;
        this.pontos = pontos;
        this.vez = vez;
    }

    renderizarMao() {
        let divPlayer1 = document.querySelector(`#player_${this.vez}`);

        this.pedras.forEach(pedra => {
            divPlayer1.appendChild(pedra.renderizar());
        });
    }

    verMao() {
        return this.pedras;
    }

    buscarPedra(direita, esquerda) {
        return this.pedras.find(pedra => pedra.buscar(direita, esquerda));
    }

    pontuar(pontos) {
        this.pontos += pontos;
    }
}
