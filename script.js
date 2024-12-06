document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥝', '🍓'];
    const grid = document.getElementById('game-grid');
    const resultDisplay = document.getElementById('result');
    let chosenCards = [];
    let chosenCardsIds = [];
    let matchedCards = [];

    // Duplica os emojis e embaralha
    const cardArray = [...emojis, ...emojis].sort(() => 0.5 - Math.random());

    // Cria o tabuleiro
    function createBoard() {
        cardArray.forEach((_, i) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.innerHTML = '?';
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    // Vira a carta
    function flipCard() {
        const cardId = this.getAttribute('data-id');

        // Evita clicar na mesma carta duas vezes ou em cartas já combinadas
        if (chosenCardsIds.includes(cardId) || matchedCards.includes(cardId)) {
            return;
        }

        chosenCards.push(cardArray[cardId]);
        chosenCardsIds.push(cardId);
        this.innerHTML = cardArray[cardId];

        // Checa se foram escolhidas duas cartas
        if (chosenCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    // Verifica correspondência
    function checkMatch() {
        const cards = document.querySelectorAll('.card');
        const [firstId, secondId] = chosenCardsIds;

        if (chosenCards[0] === chosenCards[1]) {
            alert('Parabéns! Você encontrou um par.');
            matchedCards.push(firstId, secondId);
            cards[firstId].style.visibility = 'hidden';
            cards[secondId].style.visibility = 'hidden';
        } else {
            cards[firstId].innerHTML = '?';
            cards[secondId].innerHTML = '?';
        }

        // Limpa a seleção
        chosenCards = [];
        chosenCardsIds = [];

        // Verifica se o jogo terminou
        if (matchedCards.length === cardArray.length) {
            resultDisplay.textContent = 'Parabéns! Você encontrou todos os pares!';
        }
    }

    createBoard();
});
