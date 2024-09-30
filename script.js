document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.querySelector('.puzzle-container');
    const shuffleButton = document.getElementById('shuffle-btn');
    const SIZE = 3; // Grid size (3x3)
    let pieces = [];

    function createPuzzle() {
        pieces = [];
        for (let i = 0; i < SIZE * SIZE - 1; i++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundPosition = `-${(i % SIZE) * 100}px -${Math.floor(i / SIZE) * 100}px`;

            puzzleContainer.appendChild(piece);
            pieces.push(piece);
        }

        // Create the empty slot
        const emptyPiece = document.createElement('div');
        emptyPiece.className = 'puzzle-piece empty';
        puzzleContainer.appendChild(emptyPiece);
        pieces.push(emptyPiece);
    }

    function getEmptyPosition() {
        return pieces.findIndex(piece => piece.classList.contains('empty'));
    }

    function movePiece(piece) {
        const emptyPosition = getEmptyPosition();
        const piecePosition = pieces.indexOf(piece);

        const rowDiff = Math.abs(Math.floor(piecePosition / SIZE) - Math.floor(emptyPosition / SIZE));
        const colDiff = Math.abs(piecePosition % SIZE - emptyPosition % SIZE);

        const isAdjacent = (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);

        if (isAdjacent) {
            // Swap the positions in the array
            [pieces[emptyPosition], pieces[piecePosition]] = [pieces[piecePosition], pieces[emptyPosition]];

            // Update the DOM
            puzzleContainer.innerHTML = '';
            pieces.forEach(piece => puzzleContainer.appendChild(piece));
        }
    }

    function shufflePuzzle() {
        // Randomly shuffle the pieces array
        for (let i = pieces.length - 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
        }

        // Update the DOM based on the shuffled pieces array
        puzzleContainer.innerHTML = '';
        pieces.forEach(piece => puzzleContainer.appendChild(piece));
    }

    puzzleContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('puzzle-piece') && !e.target.classList.contains('empty')) {
            movePiece(e.target);
        }
    });

    shuffleButton.addEventListener('click', shufflePuzzle);

    createPuzzle();
});