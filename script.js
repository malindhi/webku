// Konfigurasi 10 Level dengan kombinasi warna unik (Tanpa warna Berries)
const LEVELS = [
    {
        size: 3, // Level 1: Pemanasan (3x3)
        colors: {
            topLeft: { r: 255, g: 94, b: 87 },     // Merah Coral
            topRight: { r: 255, g: 242, b: 0 },    // Kuning Cerah
            bottomLeft: { r: 75, g: 207, b: 250 },  // Biru Muda
            bottomRight: { r: 156, g: 136, b: 255 } // Ungu Soft
        }
    },
    {
        size: 4, // Level 2: Sunset (4x4)
        colors: {
            topLeft: { r: 239, g: 71, b: 111 },    // Pink Neon
            topRight: { r: 255, g: 159, b: 67 },   // Jingga
            bottomLeft: { r: 15, g: 76, b: 129 },   // Biru Klasik
            bottomRight: { r: 245, g: 223, b: 77 }  // Kuning Lemon
        }
    },
    {
        size: 4, // Level 3: Ocean Mint (4x4)
        colors: {
            topLeft: { r: 6, g: 214, b: 160 },     // Mint Green
            topRight: { r: 17, g: 138, b: 178 },   // Biru Samudra
            bottomLeft: { r: 7, g: 42, b: 108 },    // Navy Gelap
            bottomRight: { r: 255, g: 209, b: 102 } // Emas Pasir
        }
    },
    {
        size: 5, // Level 4: Neon Twilight (5x5) - PENGGANTI BERRIES 🌟
        colors: {
            topLeft: { r: 0, g: 242, b: 254 },     // Neon Cyan
            topRight: { r: 156, g: 39, b: 176 },   // Bright Purple
            bottomLeft: { r: 26, g: 26, b: 89 },    // Deep Midnight Blue
            bottomRight: { r: 255, g: 0, b: 127 }   // Hot Pink
        }
    },
    {
        size: 5, // Level 5: Forest Gold (5x5)
        colors: {
            topLeft: { r: 34, g: 139, b: 34 },     // Hijau Hutan
            topRight: { r: 218, g: 165, b: 32 },   // Emas Klasik
            bottomLeft: { r: 44, g: 62, b: 80 },    // Hitam Kebiruan
            bottomRight: { r: 230, g: 126, b: 34 }  // Labu Oranye
        }
    },
    {
        size: 5, // Level 6: Lavender Fields (5x5)
        colors: {
            topLeft: { r: 108, g: 92, b: 231 },    // Lavender Cerah
            topRight: { r: 253, g: 121, b: 168 },  // Bubblegum Pink
            bottomLeft: { r: 9, g: 132, b: 227 },   // Biru Langit
            bottomRight: { r: 0, g: 184, b: 148 }   // Hijau Toska
        }
    },
    {
        size: 6, // Level 7: Cosmic Dark (6x6)
        colors: {
            topLeft: { r: 75, g: 0, b: 130 },      // Indigo
            topRight: { r: 255, g: 69, b: 0 },     // Merah Api
            bottomLeft: { r: 47, g: 53, b: 66 },    // Besi Tua
            bottomRight: { r: 241, g: 196, b: 15 }  // Kuning Kunyit
        }
    },
    {
        size: 6, // Level 8: Cyberpunk (6x6)
        colors: {
            topLeft: { r: 18, g: 203, b: 196 },    // Cyan Cerah
            topRight: { r: 217, g: 128, b: 250 },  // Ungu Muda
            bottomLeft: { r: 27, g: 20, b: 100 },   // Deep Purple
            bottomRight: { r: 238, g: 90, b: 36 }   // Merah Oranye
        }
    },
    {
        size: 6, // Level 9: Autumn Leaves (6x6)
        colors: {
            topLeft: { r: 120, g: 6, b: 6 },       // Merah Marun
            topRight: { r: 229, g: 142, b: 38 },   // Daun Kering
            bottomLeft: { r: 74, g: 86, b: 30 },    // Hijau Zaitun
            bottomRight: { r: 243, g: 230, b: 185 } // Krem Pucat
        }
    },
    {
        size: 7, // Level 10: The Ultimate Challenge (7x7)
        colors: {
            topLeft: { r: 26, g: 188, b: 156 },    // Turquoise
            topRight: { r: 155, g: 89, b: 182 },   // Amethyst Ungu
            bottomLeft: { r: 52, g: 73, b: 94 },    // Aspal Gelap
            bottomRight: { r: 243, g: 156, b: 18 }  // Oranye Pekat
        }
    }
];

let currentLevel = 0;
let moveCount = 0;
let solutionTiles = []; 
let boardTiles = []; 
let firstSelection = null;

const board = document.getElementById('game-board');
const msgText = document.getElementById('msg');
const lvlText = document.getElementById('lvl');
const moveText = document.getElementById('moves');
const nextBtn = document.getElementById('next-btn');

function mixColor(c1, c2, factor) {
    return {
        r: Math.round(c1.r + factor * (c2.r - c1.r)),
        g: Math.round(c1.g + factor * (c2.g - c1.g)),
        b: Math.round(c1.b + factor * (c2.b - c1.b))
    };
}

function createGradient() {
    solutionTiles = [];
    const lvl = LEVELS[currentLevel];
    const size = lvl.size;
    const { topLeft, topRight, bottomLeft, bottomRight } = lvl.colors;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            let fx = c / (size - 1);
            let fy = r / (size - 1);

            let top = mixColor(topLeft, topRight, fx);
            let bottom = mixColor(bottomLeft, bottomRight, fx);
            let final = mixColor(top, bottom, fy);
            
            let isFixed = (r === 0 && c === 0) || 
                          (r === 0 && c === size - 1) || 
                          (r === size - 1 && c === 0) || 
                          (r === size - 1 && c === size - 1);

            solutionTiles.push({
                color: `rgb(${final.r}, ${final.g}, ${final.b})`,
                isFixed: isFixed
            });
        }
    }
}

function shuffle() {
    boardTiles = [...solutionTiles];
    let targetIndices = [];
    boardTiles.forEach((tile, idx) => {
        if (!tile.isFixed) targetIndices.push(idx);
    });

    for (let i = targetIndices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let a = targetIndices[i];
        let b = targetIndices[j];

        let temp = boardTiles[a];
        boardTiles[a] = boardTiles[b];
        boardTiles[b] = temp;
    }
}

function render() {
    const size = LEVELS[currentLevel].size;
    board.style.gridTemplateColumns = `repeat(${size}, 45px)`;
    board.style.gridTemplateRows = `repeat(${size}, 45px)`;
    
    board.innerHTML = '';
    msgText.textContent = '';
    nextBtn.style.display = 'none';

    lvlText.textContent = currentLevel + 1;
    moveText.textContent = moveCount;

    boardTiles.forEach((tile, index) => {
        const div = document.createElement('div');
        div.className = 'tile';
        if (tile.isFixed) div.classList.add('fixed');
        div.style.backgroundColor = tile.color;
        
        div.addEventListener('click', () => tileClick(index));
        board.appendChild(div);
    });
}

function tileClick(index) {
    if (boardTiles[index].isFixed) return;
    const elements = document.querySelectorAll('.tile');

    if (firstSelection === null) {
        firstSelection = index;
        elements[index].classList.add('selected');
    } else {
        if (firstSelection === index) {
            elements[firstSelection].classList.remove('selected');
            firstSelection = null;
            return;
        }

        let temp = boardTiles[firstSelection];
        boardTiles[firstSelection] = boardTiles[index];
        boardTiles[index] = temp;

        elements[firstSelection].classList.remove('selected');
        firstSelection = null;
        moveCount++;

        render();
        checkWin();
    }
}

function checkWin() {
    let win = true;
    for (let i = 0; i < boardTiles.length; i++) {
        if (boardTiles[i].color !== solutionTiles[i].color) {
            win = false;
            break;
        }
    }

    if (win) {
        msgText.textContent = "✨ Sempurna! Gradasi warnamu sangat indah! 🎉";
        document.querySelectorAll('.tile').forEach(t => t.style.pointerEvents = 'none');
        
        if (currentLevel < LEVELS.length - 1) {
            nextBtn.style.display = 'inline-block';
        } else {
            msgText.textContent = `🏆 YIPPIE! Kamu menyelesaikan seluruh 10 level dengan total ${moveCount} gerakan! Kamulah Jagoan Warna itu!`;
        }
    }
}

function nextLevel() {
    if (currentLevel < LEVELS.length - 1) {
        currentLevel++;
        initGame();
    }
}

function initGame() {
    firstSelection = null;
    moveCount = 0;
    createGradient();
    shuffle();
    render();
}

window.onload = initGame;
