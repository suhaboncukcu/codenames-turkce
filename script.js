const TURKISH_WORDS = [
    'AĞAÇ', 'ANNE', 'ARABA', 'ARKADAŞ', 'ASLAN', 'AYAKKABI', 'AYNA', 'BABA', 'BALIK', 'BANKA',
    'BAŞKAN', 'BEBEK', 'BEYAZ', 'BILGISAYAR', 'BİLİM', 'BİRARA', 'BİTKİ', 'BÖCEK', 'BULUT', 'CEKET',
    'CEP', 'CİNS', 'ÇANTA', 'ÇATAL', 'ÇAY', 'ÇEMBER', 'ÇİÇEK', 'ÇOCUK', 'DANS', 'DEFTER',
    'DENİZ', 'DEVRE', 'DOKTOR', 'DONDURMA', 'DUVAR', 'DÜNYA', 'ELMA', 'EV', 'FARE', 'FİL',
    'FUTBOL', 'GECE', 'GEMI', 'GÖKYÜZÜ', 'GÖL', 'GÖMLEK', 'GÖZLÜK', 'GÜNEŞ', 'HAVA', 'HAYAT',
    'HAYVAN', 'HESAP', 'İNEK', 'İP', 'İSTASYON', 'KAHVE', 'KALE', 'KALEM', 'KAPI', 'KARGA',
    'KART', 'KEDI', 'KELİME', 'KEMIK', 'KEMAN', 'KİLİSE', 'KİRAZ', 'KİTAP', 'KOL', 'KÖPEK',
    'KÖPRÜ', 'KRAL', 'KUMAŞ', 'KUŞ', 'KURT', 'KUTU', 'LIMON', 'LIMAN', 'MASA', 'MASAL',
    'MAVİ', 'MEKTUP', 'MERKEZ', 'MERDİVEN', 'METRO', 'MEYVE', 'MİLYON', 'MİLYAR', 'MÜZE', 'MÜZİK',
    'OKSIJEN', 'OKUL', 'OPERA', 'ORDU', 'ORMAN', 'OTEL', 'OYUN', 'ÖĞRETMEN', 'PAKET', 'PANDA',
    'PANTOLON', 'PARA', 'PARK', 'PARMAK', 'PASTA', 'PİANO', 'PİRİNÇ', 'PİYANO', 'PLAJ', 'POLİS',
    'PRENS', 'PRENSES', 'RADYO', 'RAKET', 'RENK', 'RESIM', 'ROBOT', 'ROKET', 'RÜYA', 'SABUN',
    'SAÇ', 'SAAT', 'SAHNE', 'SANDALYE', 'SARAY', 'SAVAŞ', 'SES', 'SİNEMA', 'SOKAK', 'SU',
    'SÜPER', 'ŞAHİN', 'ŞAPKA', 'ŞEHİR', 'ŞEKER', 'ŞİFRE', 'TABAK', 'TAKIM', 'TARAF', 'TARİH',
    'TAŞIT', 'TAVUK', 'TAZE', 'TAZE', 'TEK', 'TELEFON', 'TEMEK', 'TİYATRO', 'TOP', 'TREN',
    'UYKU', 'UÇAK', 'UZAY', 'ÜLKE', 'ÜZÜM', 'VALİZ', 'VİRÜS', 'YAĞMUR', 'YAKA', 'YALAN',
    'YATAK', 'YATIRIM', 'YAZI', 'YEŞİL', 'YILDIZ', 'YILAN', 'YOĞURT', 'YOL', 'YUNUS', 'ZAFER',
    'ZAMAN', 'ZİL', 'ZİNCİR', 'ALTIN', 'AMCA', 'ANKA', 'ASKI', 'AYAK', 'AYNA', 'BACA',
    'BAHÇE', 'BAKIR', 'BAYRAK', 'BERBER', 'BİBER', 'BİLET', 'BİNA', 'BÖREK', 'BURUN', 'BUZUL',
    'CAMI', 'CAN', 'CENNET', 'CEVAP', 'ÇADIR', 'ÇARŞI', 'ÇATAL', 'ÇİN', 'DAĞ', 'DAKİKA',
    'DELİ', 'DENİZCI', 'DERİ', 'DERYA', 'DİKEN', 'DİL', 'DİŞ', 'DÜĞME', 'DÜŞMAN', 'EKİM',
    'EKRAN', 'EKMEK', 'ELBİSE', 'ELMAS', 'EŞYA', 'FASULYE', 'FARE', 'FENER', 'FİLM', 'FIRIN',
    'GAGA', 'GAZETE', 'GECE', 'GITAR', 'GÖZ', 'GÜÇ', 'GÜMÜŞ', 'GÜVERCIN', 'HAKİM', 'HAL',
    'HALAT', 'HALI', 'HAMUR', 'HARF', 'HARITA', 'HASIR', 'HASTA', 'HAT', 'HAVLU', 'HAVUZ',
    'HIZIR', 'HIRSIZ', 'İĞNE', 'İLAÇ', 'İMZA', 'İSKELE', 'İSKEMLET', 'İŞARET', 'JAPON', 'KAFA',
    'KAHKAHA', 'KALABALIK', 'KALEM', 'KALP', 'KAMYON', 'KANAT', 'KANUN', 'KAPI', 'KAPTAN', 'KARDEŞ'
];

let gameState = {
    words: [],
    types: [],
    revealed: [],
    isSpymasterView: false,
    redRemaining: 0,
    blueRemaining: 0,
    gameOver: false,
    seed: null
};

// Seeded Random Number Generator (Mulberry32)
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

let rng = Math.random; // Default to Math.random

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initGame() {
    const urlParams = new URLSearchParams(window.location.search);
    const seedParam = urlParams.get('game');

    if (seedParam) {
        newGame(parseInt(seedParam, 10));
    } else {
        newGame();
    }
}

function newGame(seed = null) {
    // Generate or use provided seed
    const gameSeed = seed || Math.floor(Math.random() * 1000000);
    gameState.seed = gameSeed;

    // Initialize RNG with seed
    rng = mulberry32(gameSeed);

    // Update URL without reloading
    const newUrl = `${window.location.pathname}?game=${gameSeed}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Select 25 random words
    const shuffled = shuffleArray(TURKISH_WORDS);
    gameState.words = shuffled.slice(0, 25);

    // Determine starting team (random)
    const startingTeam = rng() < 0.5 ? 'red' : 'blue';

    // Create card types: 9 for starting team, 8 for other team, 7 neutral, 1 assassin
    const types = [];
    const redCount = startingTeam === 'red' ? 9 : 8;
    const blueCount = startingTeam === 'blue' ? 9 : 8;

    for (let i = 0; i < redCount; i++) types.push('red');
    for (let i = 0; i < blueCount; i++) types.push('blue');
    for (let i = 0; i < 7; i++) types.push('neutral');
    types.push('assassin');

    gameState.types = shuffleArray(types);
    gameState.revealed = new Array(25).fill(false);
    gameState.redRemaining = redCount;
    gameState.blueRemaining = blueCount;
    gameState.gameOver = false;
    gameState.isSpymasterView = false; // Reset view on new game

    updateScores();
    renderBoard();

    document.getElementById('game-over').classList.remove('show');
}

function toggleView() {
    gameState.isSpymasterView = !gameState.isSpymasterView;
    renderBoard();
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector('.copy-link-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Kopyalandı!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function revealCard(index) {
    if (gameState.revealed[index] || gameState.gameOver) return;

    gameState.revealed[index] = true;
    const type = gameState.types[index];

    if (type === 'red') {
        gameState.redRemaining--;
    } else if (type === 'blue') {
        gameState.blueRemaining--;
    } else if (type === 'assassin') {
        gameState.gameOver = true;
        // The team that clicked the assassin loses
    }

    updateScores();
    renderBoard();
    checkWin();
}

function checkWin() {
    const gameOverDiv = document.getElementById('game-over');

    if (gameState.redRemaining === 0) {
        gameOverDiv.textContent = '🎉 KIRMIZI TAKIM KAZANDI! 🎉';
        gameOverDiv.className = 'game-over show red';
        gameState.gameOver = true;
    } else if (gameState.blueRemaining === 0) {
        gameOverDiv.textContent = '🎉 MAVİ TAKIM KAZANDI! 🎉';
        gameOverDiv.className = 'game-over show blue';
        gameState.gameOver = true;
    } else if (gameState.gameOver) {
        // Assassin was clicked
        gameOverDiv.textContent = '💀 SUİKASTÇI! OYUN BİTTİ! 💀';
        gameOverDiv.className = 'game-over show';
        gameOverDiv.style.color = '#2d3748';
    }
}

function updateScores() {
    document.getElementById('red-score').textContent = gameState.redRemaining;
    document.getElementById('blue-score').textContent = gameState.blueRemaining;
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    for (let i = 0; i < 25; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = gameState.words[i];

        if (gameState.revealed[i]) {
            card.classList.add('revealed', gameState.types[i]);
        } else if (gameState.isSpymasterView) {
            card.classList.add(`spymaster-${gameState.types[i]}`);
        }

        card.onclick = () => revealCard(i);
        board.appendChild(card);
    }
}

// Start game on load
initGame();
