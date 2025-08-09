// Event listener for DOMContentLoaded
window.addEventListener("DOMContentLoaded", domLoaded);

// Instance of MineGame
let game = new MineGame("easy");

// Flag toggle
let flagOn = false;

// Called when DOM loads. Adds event listeners, starts a new easy game, and begins rendering
function domLoaded()
{
    // Click event listener for new game button
    const newGameButton = document.getElementById("newGame");
    const difficultyButton = document.getElementById("difficulty");
    newGameButton.addEventListener("click", function() {newGame(difficultyButton.value)});

    // Click event listener for flag button
    const flagButton = document.getElementById("flag");
    flagButton.addEventListener("click", toggleFlag);

    // Start new easy game
    newGame("easy");

    // Begin rendering
    window.requestAnimationFrame(render);
}

// Handles new game click event. Resets to a new game, resets game info paragraph
function newGame(difficulty)
{
    // Create new game object
    game = new MineGame(difficulty);

    // Set grid size
    document.getElementById("gameArea").style.gridTemplateColumns = "repeat(" + game.colCount + ", auto)";
    document.getElementById("gameArea").style.gridTemplateRows = "repeat(" + game.rowCount + ", auto)";

    // Create tiles
    createGameTiles();

    // Reset Game Info area
    const gameInfo = document.getElementById("gameInfo");
    gameInfo.textContent = "";
    game.flagOn = false;
}

// Handles creating buttons for game area
function createGameTiles()
{
    // Remove all old tiles
    let gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "";

    // Loop through game grid and create buttons for each one
    for (let row = 0; row < game.rowCount; row++)
    {
        for (let col = 0; col < game.colCount; col++)
        {
            let tile = game.getTile(row, col);
            let button = document.createElement('input');
            button.classList.add("tile");
            button.id = "r" + row + "c" + col;
            button.type = "button";
            let gameWidth = gameArea.getBoundingClientRect().width;
            let gameHeight = gameArea.getBoundingClientRect().height;
            button.style.width = gameWidth / game.colCount + "px";
            button.style.height = gameHeight / game.rowCount + "px";
            if (tile.mine)
            {
                button.value = "💥";
            }
            else
            {
                button.value = tile.numMines;
            }
            
            // Add event listener to button
            button.addEventListener("click", function(){clickTile(row, col)});

            gameArea.appendChild(button);
        }
    }
}

// Handles flag clicked event. Toggle flag button
function toggleFlag()
{ 
    let flagButton = document.getElementById("flag");
    
    // Highlight flag button when toggled on
    if (!flagOn)
    {
        flagButton.classList.add("highlight");
    }
    else
    {
        flagButton.classList.remove("highlight");
    }
    flagOn = !flagOn;
}

// Handles a click on a tile. Reveals tile and checks if game is won or lost
function clickTile(row, col)
{
    // Ignore click if game is already won or lost
    if (game.won || game.lose)
    {
        return;
    }

    game.tileClicked(row, col, flagOn);

    // Check if game won
    if (game.won)
    {
        let score = game.score;
        document.getElementById("gameInfo").innerHTML = "<p><strong> You Win! </strong></p> <p> Score: " + score + "</p>"
    }
    if (game.lose)
    {
        let score = game.score;
        document.getElementById("gameInfo").innerHTML = "<p><strong> You Exploded! </strong></p> <p> Score: " + score + "</p>"
    }
}

// Render game tiles
function render()
{
    // Request next animation frame in advance
    window.requestAnimationFrame(render);

    for (let row = 0; row < game.rowCount; row++)
    {
        for (let col = 0; col < game.colCount; col++)
        {
            let tile = game.getTile(row, col);
            let button = document.getElementById("r" + row + "c" + col);
            // Check if tile is revealed
            if (tile.revealed)
            {
                button.style.fontSize = "100%";

                if (tile.mine)
                {
                    button.value = "💥";
                }
                else
                {
                    button.value = tile.numMines;
                }
            }
            else if (tile.flagged)
            {
                button.value = "⚑";
                button.style.fontSize = "100%";
                button.style.color = "darkmagenta";
            }
            else
            {
                button.style.fontSize = "0";
            }
        }
    }
}