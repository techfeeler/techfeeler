// Tech Feeler Gaming Platform JavaScript
class TechFeelerPlatform {
    constructor() {
        this.games = [];
        this.currentFilter = 'all';
        this.currentTab = 'weekly';
        this.currentGame = null;
        this.stats = {
            totalGames: 0,
            totalPlayers: 1234,
            totalPlays: 5678
        };
        
        // Sample games data - will be initialized after methods are defined
        this.sampleGames = [];
        
        this.leaderboardData = {
            weekly: [
                { rank: 1, name: "GameMaster99", game: "Space Invaders", score: 15420 },
                { rank: 2, name: "PixelWarrior", game: "Snake Game", score: 12850 },
                { rank: 3, name: "ArcadeKing", game: "Breakout", score: 11200 },
                { rank: 4, name: "MemoryChamp", game: "Memory Match", score: 9800 },
                { rank: 5, name: "StrategyPro", game: "Tic Tac Toe", score: 8500 }
            ],
            monthly: [
                { rank: 1, name: "GameMaster99", game: "Space Invaders", score: 45680 },
                { rank: 2, name: "PixelWarrior", game: "Snake Game", score: 38920 },
                { rank: 3, name: "ArcadeKing", game: "Breakout", score: 32100 },
                { rank: 4, name: "MemoryChamp", game: "Memory Match", score: 28750 },
                { rank: 5, name: "StrategyPro", game: "Tic Tac Toe", score: 25600 }
            ],
            "all-time": [
                { rank: 1, name: "GameMaster99", game: "Space Invaders", score: 125680 },
                { rank: 2, name: "PixelWarrior", game: "Snake Game", score: 98750 },
                { rank: 3, name: "ArcadeKing", game: "Breakout", score: 85620 },
                { rank: 4, name: "MemoryChamp", game: "Memory Match", score: 72340 },
                { rank: 5, name: "StrategyPro", game: "Tic Tac Toe", score: 68900 }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.initializeSampleGames();
        this.loadGames();
        this.setupEventListeners();
        this.updateStats();
        this.updateCategoryCounts();
        this.renderGames();
        this.renderLeaderboard();
    }
    
    initializeSampleGames() {
        this.sampleGames = [
            {
                id: 1,
                name: "Candy Crush",
                description: "Match colorful candies to clear the board and achieve your objectives!",
                category: "puzzle",
                difficulty: "medium",
                image: "https://via.placeholder.com/300x200/ff69b4/ffffff?text=Candy+Crush",
                code: this.getCandyCrushCode(),
                plays: 892,
                rating: 4.8
            },
            {
                id: 2,
                name: "Space Invaders",
                description: "Classic arcade game where you defend Earth from alien invaders.",
                category: "arcade",
                difficulty: "easy",
                image: "https://via.placeholder.com/300x200/00d4ff/ffffff?text=Space+Invaders",
                code: this.getSpaceInvadersCode(),
                plays: 234,
                rating: 4.5
            },
            {
                id: 3,
                name: "Snake Game",
                description: "Control a snake to eat food and grow longer. Don't hit the walls!",
                category: "arcade",
                difficulty: "easy",
                image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Snake+Game",
                code: this.getSnakeGameCode(),
                plays: 456,
                rating: 4.2
            },
            {
                id: 4,
                name: "Memory Match",
                description: "Test your memory by matching pairs of cards.",
                category: "puzzle",
                difficulty: "medium",
                image: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Memory+Match",
                code: this.getMemoryMatchCode(),
                plays: 189,
                rating: 4.7
            },
            {
                id: 5,
                name: "Tic Tac Toe",
                description: "Classic strategy game. Get three in a row to win!",
                category: "strategy",
                difficulty: "easy",
                image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Tic+Tac+Toe",
                code: this.getTicTacToeCode(),
                plays: 678,
                rating: 4.0
            },
            {
                id: 6,
                name: "Breakout",
                description: "Break all the bricks using your paddle and ball.",
                category: "arcade",
                difficulty: "medium",
                image: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Breakout",
                code: this.getBreakoutCode(),
                plays: 345,
                rating: 4.3
            },
            {
                id: 7,
                name: "Number Guessing",
                description: "Guess the number between 1 and 100. Test your luck!",
                category: "puzzle",
                difficulty: "easy",
                image: "https://via.placeholder.com/300x200/ef4444/ffffff?text=Number+Guessing",
                code: this.getNumberGuessingCode(),
                plays: 123,
                rating: 3.8
            }
        ];
    }
    
    loadGames() {
        // Load games from localStorage or use sample games
        const savedGames = localStorage.getItem('techFeelerGames');
        if (savedGames) {
            this.games = JSON.parse(savedGames);
        } else {
            this.games = [...this.sampleGames];
            this.saveGames();
        }
        this.stats.totalGames = this.games.length;
    }
    
    saveGames() {
        localStorage.setItem('techFeelerGames', JSON.stringify(this.games));
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
            });
        });
        
        // Game filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.renderGames();
            });
        });
        
        // Leaderboard tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.getAttribute('data-tab');
                this.renderLeaderboard();
            });
        });
        
        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.currentFilter = category;
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                document.querySelector(`[data-filter="${category}"]`).classList.add('active');
                this.showSection('games');
                this.renderGames();
            });
        });
        
        // Add game form
        const gameForm = document.getElementById('gameForm');
        if (gameForm) {
            gameForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addGame();
            });
        }
    }
    
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    updateStats() {
        document.getElementById('totalGames').textContent = this.stats.totalGames;
        document.getElementById('totalPlayers').textContent = this.stats.totalPlayers;
        document.getElementById('totalPlays').textContent = this.stats.totalPlays;
        
        // Animate numbers
        this.animateNumbers();
    }
    
    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 30);
        });
    }
    
    updateCategoryCounts() {
        const categories = ['action', 'puzzle', 'arcade', 'strategy', 'sports', 'racing'];
        categories.forEach(category => {
            const count = this.games.filter(game => game.category === category).length;
            const categoryCard = document.querySelector(`[data-category="${category}"] .game-count`);
            if (categoryCard) {
                categoryCard.textContent = `${count} games`;
            }
        });
    }
    
    renderGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        let filteredGames = this.games;
        if (this.currentFilter !== 'all') {
            filteredGames = this.games.filter(game => game.category === this.currentFilter);
        }
        
        gamesGrid.innerHTML = filteredGames.map(game => `
            <div class="game-card" onclick="techFeeler.openGame(${game.id})">
                <div class="game-image">
                    ${game.image ? `<img src="${game.image}" alt="${game.name}" style="width: 100%; height: 100%; object-fit: cover;">` : '<i class="fas fa-gamepad"></i>'}
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.name}</h3>
                    <p class="game-description">${game.description}</p>
                    <div class="game-meta">
                        <span class="game-category">${game.category}</span>
                        <span class="game-difficulty">${game.difficulty}</span>
                    </div>
                    <div class="game-stats">
                        <span><i class="fas fa-play"></i> ${game.plays} plays</span>
                        <span><i class="fas fa-star"></i> ${game.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        const data = this.leaderboardData[this.currentTab];
        leaderboardList.innerHTML = data.map(entry => `
            <div class="leaderboard-entry">
                <div class="rank">${entry.rank}</div>
                <div class="player-info">
                    <div class="player-name">${entry.name}</div>
                    <div class="player-game">${entry.game}</div>
                </div>
                <div class="score">${entry.score.toLocaleString()}</div>
            </div>
        `).join('');
    }
    
    openGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        
        this.currentGame = game;
        
        // Update modal title
        document.getElementById('modalGameTitle').textContent = game.name;
        
        // Load game code
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = game.code;
        
        // Show modal
        document.getElementById('gameModal').style.display = 'block';
        
        // Update play count
        game.plays++;
        this.saveGames();
        this.updateStats();
        this.renderGames();
    }
    
    closeGameModal() {
        document.getElementById('gameModal').style.display = 'none';
        this.currentGame = null;
    }
    
    restartGame() {
        if (this.currentGame) {
            const gameContainer = document.getElementById('gameContainer');
            gameContainer.innerHTML = this.currentGame.code;
        }
    }
    
    addGame() {
        const form = document.getElementById('gameForm');
        const formData = new FormData(form);
        
        const newGame = {
            id: Date.now(),
            name: formData.get('gameName'),
            description: formData.get('gameDescription'),
            category: formData.get('gameCategory'),
            difficulty: formData.get('gameDifficulty'),
            image: formData.get('gameImage') || '',
            code: formData.get('gameCode') || '<p>No game code provided</p>',
            plays: 0,
            rating: 0
        };
        
        this.games.push(newGame);
        this.saveGames();
        this.updateStats();
        this.updateCategoryCounts();
        this.renderGames();
        
        // Reset form
        form.reset();
        
        // Show success message
        alert('Game added successfully!');
        
        // Switch to games section
        this.showSection('games');
    }
    
    resetForm() {
        document.getElementById('gameForm').reset();
    }
    
    // Sample Game Codes
    getCandyCrushCode() {
        return `
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ff69b4, #ff1493); border-radius: 15px;">
                <h3 style="color: white; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🍭 Candy Crush 🍭</h3>
                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <div style="text-align: left;">
                            <div style="color: #ff69b4; font-weight: bold;">Level: <span id="candyLevel">1</span></div>
                            <div style="color: #ff69b4; font-weight: bold;">Moves: <span id="candyMoves">25</span></div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: #ff69b4; font-weight: bold;">Score: <span id="candyScore">0</span></div>
                            <div style="color: #ff69b4; font-weight: bold;">Target: <span id="candyTarget">1000</span></div>
                        </div>
                    </div>
                    <div id="candyBoard" style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; max-width: 400px; margin: 0 auto; background: #f0f0f0; padding: 10px; border-radius: 10px;"></div>
                    <div style="margin-top: 15px;">
                        <button onclick="startCandyCrush()" style="background: #ff69b4; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold;">Start Game</button>
                        <button onclick="resetCandyCrush()" style="background: #ff1493; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; margin-left: 10px;">Reset</button>
                    </div>
                    <p style="color: #666; margin-top: 10px; font-size: 14px;">Match 3 or more candies of the same color to clear them!</p>
                </div>
            </div>
            <script>
                let candyGame = {
                    board: [],
                    score: 0,
                    moves: 25,
                    level: 1,
                    target: 1000,
                    gameActive: false,
                    selectedCandy: null,
                    candyTypes: ['🍎', '🍊', '🍇', '🍓', '🍋', '🍒'],
                    boardSize: 8,
                    isProcessing: false
                };
                
                function startCandyCrush() {
                    candyGame.gameActive = true;
                    candyGame.score = 0;
                    candyGame.moves = 25;
                    candyGame.level = 1;
                    candyGame.target = 1000;
                    candyGame.selectedCandy = null;
                    candyGame.isProcessing = false;
                    
                    initializeBoard();
                    renderBoard();
                    updateUI();
                }
                
                function initializeBoard() {
                    candyGame.board = [];
                    for (let row = 0; row < candyGame.boardSize; row++) {
                        candyGame.board[row] = [];
                        for (let col = 0; col < candyGame.boardSize; col++) {
                            candyGame.board[row][col] = candyGame.candyTypes[Math.floor(Math.random() * candyGame.candyTypes.length)];
                        }
                    }
                    
                    // Remove initial matches
                    while (findMatches().length > 0) {
                        removeMatches();
                        fillEmptySpaces();
                    }
                }
                
                function renderBoard() {
                    const boardElement = document.getElementById('candyBoard');
                    if (!boardElement) return;
                    
                    boardElement.innerHTML = '';
                    
                    for (let row = 0; row < candyGame.boardSize; row++) {
                        for (let col = 0; col < candyGame.boardSize; col++) {
                            const cell = document.createElement('div');
                            cell.className = 'candy-cell';
                            cell.dataset.row = row;
                            cell.dataset.col = col;
                            cell.textContent = candyGame.board[row][col];
                            cell.style.cssText = \`
                                width: 40px; height: 40px; 
                                background: white; 
                                border: 2px solid #ddd; 
                                border-radius: 8px; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center; 
                                cursor: pointer; 
                                font-size: 20px;
                                transition: all 0.3s ease;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            \`;
                            
                            cell.addEventListener('click', () => selectCandy(row, col));
                            boardElement.appendChild(cell);
                        }
                    }
                }
                
                function selectCandy(row, col) {
                    if (!candyGame.gameActive || candyGame.moves <= 0 || candyGame.isProcessing) return;
                    
                    const cell = document.querySelector(\`[data-row="\${row}"][data-col="\${col}"]\`);
                    if (!cell) return;
                    
                    if (candyGame.selectedCandy === null) {
                        candyGame.selectedCandy = { row, col };
                        cell.style.border = '3px solid #ff69b4';
                        cell.style.transform = 'scale(1.1)';
        } else {
                        const prevCell = document.querySelector(\`[data-row="\${candyGame.selectedCandy.row}"][data-col="\${candyGame.selectedCandy.col}"]\`);
                        if (prevCell) {
                            prevCell.style.border = '2px solid #ddd';
                            prevCell.style.transform = 'scale(1)';
                        }
                        
                        if (candyGame.selectedCandy.row === row && candyGame.selectedCandy.col === col) {
                            candyGame.selectedCandy = null;
                        } else if (isAdjacent(candyGame.selectedCandy, { row, col })) {
                            candyGame.isProcessing = true;
                            swapCandies(candyGame.selectedCandy, { row, col });
                            candyGame.moves--;
                            
                            setTimeout(() => {
                                processMove();
                            }, 300);
                        } else {
                            candyGame.selectedCandy = { row, col };
                            cell.style.border = '3px solid #ff69b4';
                            cell.style.transform = 'scale(1.1)';
                        }
                    }
                }
                
                function processMove() {
                    let hasMatches = true;
                    let totalScoreGained = 0;
                    
                    while (hasMatches) {
                        const matches = findMatches();
                        if (matches.length === 0) {
                            hasMatches = false;
                        } else {
                            totalScoreGained += removeMatches();
                            fillEmptySpaces();
                        }
                    }
                    
                    candyGame.score += totalScoreGained;
                    
                    // Check for level up
                    if (candyGame.score >= candyGame.target) {
                        candyGame.level++;
                        candyGame.target += 500;
                        candyGame.moves += 5;
                        alert(\`Level Up! Now on level \${candyGame.level}\`);
                    }
                    
                    candyGame.selectedCandy = null;
                    candyGame.isProcessing = false;
                    renderBoard();
                    updateUI();
                    
                    // Check game over
                    if (candyGame.moves <= 0) {
                        setTimeout(() => {
                            alert(\`Game Over! Final Score: \${candyGame.score}\`);
                            candyGame.gameActive = false;
                        }, 500);
                    }
                }
                
                function isAdjacent(pos1, pos2) {
                    const rowDiff = Math.abs(pos1.row - pos2.row);
                    const colDiff = Math.abs(pos1.col - pos2.col);
                    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
                }
                
                function swapCandies(pos1, pos2) {
                    const temp = candyGame.board[pos1.row][pos1.col];
                    candyGame.board[pos1.row][pos1.col] = candyGame.board[pos2.row][pos2.col];
                    candyGame.board[pos2.row][pos2.col] = temp;
                }
                
                function findMatches() {
                    const matches = [];
                    
                    // Check horizontal matches
                    for (let row = 0; row < candyGame.boardSize; row++) {
                        for (let col = 0; col < candyGame.boardSize - 2; col++) {
                            if (candyGame.board[row][col] === candyGame.board[row][col + 1] && 
                                candyGame.board[row][col] === candyGame.board[row][col + 2] &&
                                candyGame.board[row][col] !== '') {
                                matches.push({ row, col, type: 'horizontal' });
                            }
                        }
                    }
                    
                    // Check vertical matches
                    for (let row = 0; row < candyGame.boardSize - 2; row++) {
                        for (let col = 0; col < candyGame.boardSize; col++) {
                            if (candyGame.board[row][col] === candyGame.board[row + 1][col] && 
                                candyGame.board[row][col] === candyGame.board[row + 2][col] &&
                                candyGame.board[row][col] !== '') {
                                matches.push({ row, col, type: 'vertical' });
                            }
                        }
                    }
                    
                    return matches;
                }
                
                function removeMatches() {
                    const matches = findMatches();
                    let scoreGained = 0;
                    
                    matches.forEach(match => {
                        if (match.type === 'horizontal') {
                            for (let i = 0; i < 3; i++) {
                                if (candyGame.board[match.row][match.col + i] !== '') {
                                    candyGame.board[match.row][match.col + i] = '';
                                    scoreGained += 10;
                                }
                            }
                        } else if (match.type === 'vertical') {
                            for (let i = 0; i < 3; i++) {
                                if (candyGame.board[match.row + i][match.col] !== '') {
                                    candyGame.board[match.row + i][match.col] = '';
                                    scoreGained += 10;
                                }
                            }
                        }
                    });
                    
                    return scoreGained;
                }
                
                function fillEmptySpaces() {
                    let changed = true;
                    while (changed) {
                        changed = false;
                        
                        // Drop candies down
                        for (let col = 0; col < candyGame.boardSize; col++) {
                            for (let row = candyGame.boardSize - 1; row >= 0; row--) {
                                if (candyGame.board[row][col] === '') {
                                    // Find the first non-empty candy above
                                    for (let i = row - 1; i >= 0; i--) {
                                        if (candyGame.board[i][col] !== '') {
                                            candyGame.board[row][col] = candyGame.board[i][col];
                                            candyGame.board[i][col] = '';
                                            changed = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        
                        // Fill empty spaces at the top with new candies
                        for (let col = 0; col < candyGame.boardSize; col++) {
                            for (let row = 0; row < candyGame.boardSize; row++) {
                                if (candyGame.board[row][col] === '') {
                                    candyGame.board[row][col] = candyGame.candyTypes[Math.floor(Math.random() * candyGame.candyTypes.length)];
                                    changed = true;
                                }
                            }
                        }
                    }
                }
                
                function updateUI() {
                    const scoreElement = document.getElementById('candyScore');
                    const movesElement = document.getElementById('candyMoves');
                    const levelElement = document.getElementById('candyLevel');
                    const targetElement = document.getElementById('candyTarget');
                    
                    if (scoreElement) scoreElement.textContent = candyGame.score;
                    if (movesElement) movesElement.textContent = candyGame.moves;
                    if (levelElement) levelElement.textContent = candyGame.level;
                    if (targetElement) targetElement.textContent = candyGame.target;
                }
                
                function resetCandyCrush() {
                    candyGame.gameActive = false;
                    candyGame.selectedCandy = null;
                    candyGame.isProcessing = false;
                    startCandyCrush();
                }
                
                // Initialize the game
                startCandyCrush();
            </script>
        `;
    }
    
    getSpaceInvadersCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Space Invaders</h3>
                <canvas id="spaceCanvas" width="400" height="300" style="border: 2px solid #00d4ff; background: #000;"></canvas>
                <div style="margin-top: 10px;">
                    <button onclick="startSpaceInvaders()" style="background: #00d4ff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Start Game</button>
                </div>
                <p style="color: #b0b0b0; margin-top: 10px;">Use arrow keys to move, spacebar to shoot!</p>
            </div>
            <script>
                let spaceGame = {
                    canvas: null,
                    ctx: null,
                    player: { x: 200, y: 280, width: 40, height: 20 },
                    bullets: [],
                    enemies: [],
                    score: 0,
                    gameRunning: false
                };
                
                function startSpaceInvaders() {
                    spaceGame.canvas = document.getElementById('spaceCanvas');
                    spaceGame.ctx = spaceGame.canvas.getContext('2d');
                    spaceGame.gameRunning = true;
                    
                    // Create enemies
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < 3; j++) {
                            spaceGame.enemies.push({
                                x: 50 + i * 60,
                                y: 50 + j * 40,
                                width: 30,
                                height: 20,
                                alive: true
                            });
                        }
                    }
                    
                    gameLoop();
                }
                
                function gameLoop() {
                    if (!spaceGame.gameRunning) return;
                    
                    // Clear canvas
                    spaceGame.ctx.fillStyle = '#000';
                    spaceGame.ctx.fillRect(0, 0, spaceGame.canvas.width, spaceGame.canvas.height);
                    
                    // Draw player
                    spaceGame.ctx.fillStyle = '#00d4ff';
                    spaceGame.ctx.fillRect(spaceGame.player.x, spaceGame.player.y, spaceGame.player.width, spaceGame.player.height);
                    
                    // Draw enemies
                    spaceGame.ctx.fillStyle = '#ff6b35';
                    spaceGame.enemies.forEach(enemy => {
                        if (enemy.alive) {
                            spaceGame.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                        }
                    });
                    
                    // Draw bullets
                    spaceGame.ctx.fillStyle = '#ffff00';
                    spaceGame.bullets.forEach(bullet => {
                        spaceGame.ctx.fillRect(bullet.x, bullet.y, 4, 8);
                    });
                    
                    // Update bullets
                    spaceGame.bullets = spaceGame.bullets.filter(bullet => {
                        bullet.y -= 5;
                        return bullet.y > 0;
                    });
                    
                    // Check collisions
                    spaceGame.bullets.forEach((bullet, bulletIndex) => {
                        spaceGame.enemies.forEach((enemy, enemyIndex) => {
                            if (enemy.alive && 
                                bullet.x < enemy.x + enemy.width &&
                                bullet.x + 4 > enemy.x &&
                                bullet.y < enemy.y + enemy.height &&
                                bullet.y + 8 > enemy.y) {
                                enemy.alive = false;
                                spaceGame.bullets.splice(bulletIndex, 1);
                                spaceGame.score += 10;
                            }
                        });
                    });
                    
                    // Draw score
                    spaceGame.ctx.fillStyle = '#fff';
                    spaceGame.ctx.font = '20px Arial';
                    spaceGame.ctx.fillText('Score: ' + spaceGame.score, 10, 30);
                    
                    requestAnimationFrame(gameLoop);
                }
                
                // Keyboard controls
                document.addEventListener('keydown', (e) => {
                    if (!spaceGame.gameRunning) return;
                    
                    if (e.key === 'ArrowLeft' && spaceGame.player.x > 0) {
                        spaceGame.player.x -= 10;
                    }
                    if (e.key === 'ArrowRight' && spaceGame.player.x < spaceGame.canvas.width - spaceGame.player.width) {
                        spaceGame.player.x += 10;
                    }
                    if (e.key === ' ') {
                        spaceGame.bullets.push({
                            x: spaceGame.player.x + spaceGame.player.width / 2 - 2,
                            y: spaceGame.player.y
                        });
                    }
                });
            </script>
        `;
    }
    
    getSnakeGameCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Snake Game</h3>
                <canvas id="snakeCanvas" width="400" height="400" style="border: 2px solid #ff6b35; background: #000;"></canvas>
                <div style="margin-top: 10px;">
                    <button onclick="startSnakeGame()" style="background: #ff6b35; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Start Game</button>
                </div>
                <p style="color: #b0b0b0; margin-top: 10px;">Use arrow keys to control the snake!</p>
            </div>
            <script>
                let snakeGame = {
                    canvas: null,
                    ctx: null,
                    snake: [{x: 200, y: 200}],
                    food: {x: 100, y: 100},
                    direction: {x: 0, y: 0},
                    score: 0,
                    gameRunning: false
                };
                
                function startSnakeGame() {
                    snakeGame.canvas = document.getElementById('snakeCanvas');
                    snakeGame.ctx = snakeGame.canvas.getContext('2d');
                    snakeGame.gameRunning = true;
                    snakeGameLoop();
                }
                
                function snakeGameLoop() {
                    if (!snakeGame.gameRunning) return;
                    
                    // Move snake
                    const head = {x: snakeGame.snake[0].x + snakeGame.direction.x, y: snakeGame.snake[0].y + snakeGame.direction.y};
                    snakeGame.snake.unshift(head);
                    
                    // Check food collision
                    if (head.x === snakeGame.food.x && head.y === snakeGame.food.y) {
                        snakeGame.score += 10;
                        snakeGame.food = {
                            x: Math.floor(Math.random() * 20) * 20,
                            y: Math.floor(Math.random() * 20) * 20
                        };
                    } else {
                        snakeGame.snake.pop();
                    }
                    
                    // Check wall collision
                    if (head.x < 0 || head.x >= snakeGame.canvas.width || head.y < 0 || head.y >= snakeGame.canvas.height) {
                        snakeGame.gameRunning = false;
                        alert('Game Over! Score: ' + snakeGame.score);
                        return;
                    }
                    
                    // Check self collision
                    for (let i = 1; i < snakeGame.snake.length; i++) {
                        if (head.x === snakeGame.snake[i].x && head.y === snakeGame.snake[i].y) {
                            snakeGame.gameRunning = false;
                            alert('Game Over! Score: ' + snakeGame.score);
                            return;
                        }
                    }
                    
                    // Draw everything
                    snakeGame.ctx.fillStyle = '#000';
                    snakeGame.ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);
                    
                    // Draw snake
                    snakeGame.ctx.fillStyle = '#ff6b35';
                    snakeGame.snake.forEach(segment => {
                        snakeGame.ctx.fillRect(segment.x, segment.y, 20, 20);
                    });
                    
                    // Draw food
                    snakeGame.ctx.fillStyle = '#10b981';
                    snakeGame.ctx.fillRect(snakeGame.food.x, snakeGame.food.y, 20, 20);
                    
                    // Draw score
                    snakeGame.ctx.fillStyle = '#fff';
                    snakeGame.ctx.font = '20px Arial';
                    snakeGame.ctx.fillText('Score: ' + snakeGame.score, 10, 30);
                    
                    setTimeout(snakeGameLoop, 150);
                }
                
                // Keyboard controls
                document.addEventListener('keydown', (e) => {
                    if (!snakeGame.gameRunning) return;
                    
                    switch(e.key) {
                        case 'ArrowUp':
                            if (snakeGame.direction.y === 0) snakeGame.direction = {x: 0, y: -20};
                            break;
                        case 'ArrowDown':
                            if (snakeGame.direction.y === 0) snakeGame.direction = {x: 0, y: 20};
                            break;
                        case 'ArrowLeft':
                            if (snakeGame.direction.x === 0) snakeGame.direction = {x: -20, y: 0};
                            break;
                        case 'ArrowRight':
                            if (snakeGame.direction.x === 0) snakeGame.direction = {x: 20, y: 0};
                            break;
                    }
                });
            </script>
        `;
    }
    
    getMemoryMatchCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Memory Match</h3>
                <div id="memoryBoard" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;"></div>
                <div style="margin-top: 20px;">
                    <button onclick="startMemoryGame()" style="background: #7c3aed; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Start Game</button>
                </div>
                <p style="color: #b0b0b0; margin-top: 10px;">Match pairs of cards to win!</p>
            </div>
            <script>
                let memoryGame = {
                    cards: [],
                    flippedCards: [],
                    matchedPairs: 0,
                    moves: 0,
                    gameStarted: false
                };
                
                function startMemoryGame() {
                    const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎨'];
                    memoryGame.cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
                    memoryGame.flippedCards = [];
                    memoryGame.matchedPairs = 0;
                    memoryGame.moves = 0;
                    memoryGame.gameStarted = true;
                    
                    const board = document.getElementById('memoryBoard');
                    board.innerHTML = '';
                    
                    memoryGame.cards.forEach((symbol, index) => {
                        const card = document.createElement('div');
                        card.className = 'memory-card';
                        card.dataset.index = index;
                        card.dataset.symbol = symbol;
                        card.style.cssText = 'width: 80px; height: 80px; background: #1a1a1a; border: 2px solid #7c3aed; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 24px; color: transparent;';
                        card.onclick = () => flipCard(index);
                        board.appendChild(card);
                    });
                }
                
                function flipCard(index) {
                    if (!memoryGame.gameStarted) return;
                    
                    const card = document.querySelector(\`[data-index="\${index}"]\`);
                    if (card.style.color !== 'transparent' || memoryGame.flippedCards.length >= 2) return;
                    
                    card.style.color = '#fff';
                    memoryGame.flippedCards.push({index, symbol: card.dataset.symbol});
                    
                    if (memoryGame.flippedCards.length === 2) {
                        memoryGame.moves++;
                        setTimeout(checkMatch, 1000);
                    }
                }
                
                function checkMatch() {
                    const [card1, card2] = memoryGame.flippedCards;
                    
                    if (card1.symbol === card2.symbol) {
                        memoryGame.matchedPairs++;
                        if (memoryGame.matchedPairs === 8) {
                            alert(\`Congratulations! You won in \${memoryGame.moves} moves!\`);
                        }
                    } else {
                        document.querySelector(\`[data-index="\${card1.index}"]\`).style.color = 'transparent';
                        document.querySelector(\`[data-index="\${card2.index}"]\`).style.color = 'transparent';
                    }
                    
                    memoryGame.flippedCards = [];
                }
            </script>
        `;
    }
    
    getTicTacToeCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Tic Tac Toe</h3>
                <div id="ticTacBoard" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; max-width: 300px; margin: 0 auto;"></div>
                <div style="margin-top: 20px;">
                    <button onclick="startTicTacToe()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Start Game</button>
                </div>
                <p style="color: #b0b0b0; margin-top: 10px;">Get three in a row to win!</p>
            </div>
            <script>
                let ticTacGame = {
                    board: ['', '', '', '', '', '', '', '', ''],
                    currentPlayer: 'X',
                    gameActive: false
                };
                
                function startTicTacToe() {
                    ticTacGame.board = ['', '', '', '', '', '', '', '', ''];
                    ticTacGame.currentPlayer = 'X';
                    ticTacGame.gameActive = true;
                    
                    const board = document.getElementById('ticTacBoard');
                    board.innerHTML = '';
                    
                    for (let i = 0; i < 9; i++) {
                        const cell = document.createElement('div');
                        cell.className = 'tic-tac-cell';
                        cell.dataset.index = i;
                        cell.style.cssText = 'width: 90px; height: 90px; background: #1a1a1a; border: 2px solid #10b981; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 36px; color: #10b981; font-weight: bold;';
                        cell.onclick = () => makeMove(i);
                        board.appendChild(cell);
                    }
                }
                
                function makeMove(index) {
                    if (!ticTacGame.gameActive || ticTacGame.board[index] !== '') return;
                    
                    ticTacGame.board[index] = ticTacGame.currentPlayer;
                    document.querySelector(\`[data-index="\${index}"]\`).textContent = ticTacGame.currentPlayer;
                    
                    if (checkWinner()) {
                        alert(\`Player \${ticTacGame.currentPlayer} wins!\`);
                        ticTacGame.gameActive = false;
                        return;
                    }
                    
                    if (ticTacGame.board.every(cell => cell !== '')) {
                        alert('It\\'s a tie!');
                        ticTacGame.gameActive = false;
                        return;
                    }
                    
                    ticTacGame.currentPlayer = ticTacGame.currentPlayer === 'X' ? 'O' : 'X';
                }
                
                function checkWinner() {
                    const winPatterns = [
                        [0, 1, 2], [3, 4, 5], [6, 7, 8],
                        [0, 3, 6], [1, 4, 7], [2, 5, 8],
                        [0, 4, 8], [2, 4, 6]
                    ];
                    
                    return winPatterns.some(pattern => {
                        const [a, b, c] = pattern;
                        return ticTacGame.board[a] && ticTacGame.board[a] === ticTacGame.board[b] && ticTacGame.board[a] === ticTacGame.board[c];
                    });
                }
            </script>
        `;
    }
    
    getBreakoutCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Breakout</h3>
                <canvas id="breakoutCanvas" width="400" height="500" style="border: 2px solid #f59e0b; background: #000;"></canvas>
                <div style="margin-top: 10px;">
                    <button onclick="startBreakout()" style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Start Game</button>
                </div>
                <p style="color: #b0b0b0; margin-top: 10px;">Use mouse to move paddle!</p>
            </div>
            <script>
                let breakoutGame = {
                    canvas: null,
                    ctx: null,
                    paddle: { x: 150, y: 450, width: 100, height: 20 },
                    ball: { x: 200, y: 300, dx: 3, dy: -3, radius: 10 },
                    bricks: [],
                    score: 0,
                    gameRunning: false
                };
                
                function startBreakout() {
                    breakoutGame.canvas = document.getElementById('breakoutCanvas');
                    breakoutGame.ctx = breakoutGame.canvas.getContext('2d');
                    breakoutGame.gameRunning = true;
                    
                    // Create bricks
                    breakoutGame.bricks = [];
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < 8; j++) {
                            breakoutGame.bricks.push({
                                x: j * 50,
                                y: i * 30 + 50,
                                width: 48,
                                height: 28,
                                alive: true
                            });
                        }
                    }
                    
                    breakoutGameLoop();
                }
                
                function breakoutGameLoop() {
                    if (!breakoutGame.gameRunning) return;
                    
                    // Clear canvas
                    breakoutGame.ctx.fillStyle = '#000';
                    breakoutGame.ctx.fillRect(0, 0, breakoutGame.canvas.width, breakoutGame.canvas.height);
                    
                    // Move ball
                    breakoutGame.ball.x += breakoutGame.ball.dx;
                    breakoutGame.ball.y += breakoutGame.ball.dy;
                    
                    // Ball collision with walls
                    if (breakoutGame.ball.x <= breakoutGame.ball.radius || breakoutGame.ball.x >= breakoutGame.canvas.width - breakoutGame.ball.radius) {
                        breakoutGame.ball.dx = -breakoutGame.ball.dx;
                    }
                    if (breakoutGame.ball.y <= breakoutGame.ball.radius) {
                        breakoutGame.ball.dy = -breakoutGame.ball.dy;
                    }
                    
                    // Ball collision with paddle
                    if (breakoutGame.ball.y >= breakoutGame.paddle.y - breakoutGame.ball.radius &&
                        breakoutGame.ball.x >= breakoutGame.paddle.x &&
                        breakoutGame.ball.x <= breakoutGame.paddle.x + breakoutGame.paddle.width) {
                        breakoutGame.ball.dy = -breakoutGame.ball.dy;
                    }
                    
                    // Ball out of bounds
                    if (breakoutGame.ball.y > breakoutGame.canvas.height) {
                        breakoutGame.gameRunning = false;
                        alert('Game Over! Score: ' + breakoutGame.score);
                        return;
                    }
                    
                    // Draw paddle
                    breakoutGame.ctx.fillStyle = '#f59e0b';
                    breakoutGame.ctx.fillRect(breakoutGame.paddle.x, breakoutGame.paddle.y, breakoutGame.paddle.width, breakoutGame.paddle.height);
                    
                    // Draw ball
                    breakoutGame.ctx.fillStyle = '#fff';
                    breakoutGame.ctx.beginPath();
                    breakoutGame.ctx.arc(breakoutGame.ball.x, breakoutGame.ball.y, breakoutGame.ball.radius, 0, Math.PI * 2);
                    breakoutGame.ctx.fill();
                    
                    // Draw bricks
                    breakoutGame.ctx.fillStyle = '#ef4444';
                    breakoutGame.bricks.forEach(brick => {
                        if (brick.alive) {
                            breakoutGame.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                        }
                    });
                    
                    // Check brick collisions
                    breakoutGame.bricks.forEach(brick => {
                        if (brick.alive &&
                            breakoutGame.ball.x >= brick.x &&
                            breakoutGame.ball.x <= brick.x + brick.width &&
                            breakoutGame.ball.y >= brick.y &&
                            breakoutGame.ball.y <= brick.y + brick.height) {
                            brick.alive = false;
                            breakoutGame.ball.dy = -breakoutGame.ball.dy;
                            breakoutGame.score += 10;
                        }
                    });
                    
                    // Draw score
                    breakoutGame.ctx.fillStyle = '#fff';
                    breakoutGame.ctx.font = '20px Arial';
                    breakoutGame.ctx.fillText('Score: ' + breakoutGame.score, 10, 30);
                    
                    requestAnimationFrame(breakoutGameLoop);
                }
                
                    // Mouse controls
                    const canvas = document.getElementById('breakoutCanvas');
                    if (canvas) {
                        canvas.addEventListener('mousemove', (e) => {
                            const rect = canvas.getBoundingClientRect();
                            breakoutGame.paddle.x = e.clientX - rect.left - breakoutGame.paddle.width / 2;
                            if (breakoutGame.paddle.x < 0) breakoutGame.paddle.x = 0;
                            if (breakoutGame.paddle.x > canvas.width - breakoutGame.paddle.width) {
                                breakoutGame.paddle.x = canvas.width - breakoutGame.paddle.width;
                            }
                        });
                    }
            </script>
        `;
    }
    
    getNumberGuessingCode() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h3>Number Guessing Game</h3>
                <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; max-width: 400px; margin: 0 auto;">
                    <p style="color: #b0b0b0; margin-bottom: 20px;">I'm thinking of a number between 1 and 100. Can you guess it?</p>
                    <input type="number" id="guessInput" placeholder="Enter your guess" style="width: 200px; padding: 10px; margin: 10px; border: 2px solid #ef4444; border-radius: 5px; background: #000; color: #fff;">
                    <br>
                    <button onclick="makeGuess()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">Guess</button>
                    <button onclick="startNumberGame()" style="background: #666; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">New Game</button>
                    <div id="gameMessage" style="margin-top: 20px; font-size: 18px; color: #fff;"></div>
                    <div id="gameStats" style="margin-top: 10px; color: #b0b0b0;"></div>
                </div>
            </div>
            <script>
                let numberGame = {
                    targetNumber: 0,
                    attempts: 0,
                    gameStarted: false
                };
                
                function startNumberGame() {
                    numberGame.targetNumber = Math.floor(Math.random() * 100) + 1;
                    numberGame.attempts = 0;
                    numberGame.gameStarted = true;
                    document.getElementById('gameMessage').textContent = 'New game started! Guess a number between 1 and 100.';
                    document.getElementById('gameStats').textContent = 'Attempts: 0';
                    document.getElementById('guessInput').value = '';
                }
                
                function makeGuess() {
                    if (!numberGame.gameStarted) {
                        startNumberGame();
                        return;
                    }
                    
                    const guess = parseInt(document.getElementById('guessInput').value);
                    if (isNaN(guess) || guess < 1 || guess > 100) {
                        document.getElementById('gameMessage').textContent = 'Please enter a valid number between 1 and 100.';
                        return;
                    }
                    
                    numberGame.attempts++;
                    
                    if (guess === numberGame.targetNumber) {
                        document.getElementById('gameMessage').textContent = \`Congratulations! You guessed it in \${numberGame.attempts} attempts!\`;
                        document.getElementById('gameStats').textContent = \`Final Score: \${numberGame.attempts} attempts\`;
                        numberGame.gameStarted = false;
                    } else if (guess < numberGame.targetNumber) {
                        document.getElementById('gameMessage').textContent = 'Too low! Try a higher number.';
                        document.getElementById('gameStats').textContent = \`Attempts: \${numberGame.attempts}\`;
                    } else {
                        document.getElementById('gameMessage').textContent = 'Too high! Try a lower number.';
                        document.getElementById('gameStats').textContent = \`Attempts: \${numberGame.attempts}\`;
                    }
                    
                    document.getElementById('guessInput').value = '';
                }
                
                // Start initial game
                startNumberGame();
            </script>
        `;
    }
}

// Initialize the platform when the page loads
let techFeeler;
window.addEventListener('load', () => {
    techFeeler = new TechFeelerPlatform();
});

// Global functions for game interactions
function showSection(sectionId) {
    if (techFeeler) {
        techFeeler.showSection(sectionId);
    }
}

function resetForm() {
    if (techFeeler) {
        techFeeler.resetForm();
    }
}

function closeGameModal() {
    if (techFeeler) {
        techFeeler.closeGameModal();
    }
}

function restartGame() {
    if (techFeeler) {
        techFeeler.restartGame();
    }
}