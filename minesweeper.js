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
    const difficultyButton = document.getElementById("difficulty")
    newGameButton.addEventListener("click", function() {newGame(difficultyButton.value)});

    // Click event listener for flag button
    const flagButton = document.getElementById("flag");
    flagButton.addEventListener("click", toggleFlag);

    // Click event listener for canvas
    const canvas = document.getElementById("gameArea");
    canvas.addEventListener("click", canvasClicked);

    // Start new easy game
    newGame("easy");

    // Begin rendering
    window.requestAnimationFrame(render);
}

// Handles new game click event. Resets to a new game, resets game info paragraph
function newGame(difficulty)
{
    game = new MineGame(difficulty);

    const gameInfo = document.getElementById("gameInfo");
    gameInfo.textContent = "";
    game.flagOn = false;
}

// Handles flag clicked event. Toggle flag button
function toggleFlag()
{ 
    let flagButton = document.getElementById("flag");
    
    if (!flagOn)
    {
        flagButton.style.color = "red";
    }
    else
    {
        flagButton.style.color = "black";
    }
    flagOn = !flagOn;
}

// Handles canvas clicked events
function canvasClicked(e)
{
    // Get the canvas and bounding client rectangle
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();

    // Compute click coordinates, relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert from pixel coordinates to row and column
    const row = Math.floor(y * game.rowCount / canvas.height);
    const col = Math.floor(x * game.colCount / canvas.width);

    // Call tileClicked
    game.tileClicked(row, col, flagOn);
}

// Render game tiles
function render()
{
    // Request next animation frame in advance
    window.requestAnimationFrame(render);

    let canvas = document.getElementById("gameArea");
    let ctx = canvas.getContext('2d');

    // Computer width and height of a tile's rectangle on the canvas
    const tileWidth = canvas.width / game.colCount;
    const tileHeight = canvas.height / game.rowCount;

    // Get the tile
    for (let row = 0; row < game.rowCount; row++)
    {
        for (let col = 0; col < game.colCount; col++)
        {
            let currentTile = game.getTile(row, col);

            // Fill the tile rectangle
            ctx.fillStyle = "gray";
            ctx.fillRect(tileWidth * col, tileHeight * row, tileWidth, tileHeight);

            // Draw a thin white border to make each tile visually distinct
            ctx.strokeStyle = "white";
            ctx.strokeRect(tileWidth * col, tileHeight * row, tileWidth, tileHeight);

            ctx.font = "50pt Arial";

            // Check if tile is flagged
            if (currentTile.flagged)
            {
                ctx.fillStyle = "green";
                ctx.fillText("X", tileWidth * col + (tileWidth/2) - 20, tileHeight * row + (tileHeight/2) + 20);
            }
            // Check if tile is revealed and not a mine
            else if (currentTile.revealed && !currentTile.mine)
            {
                ctx.fillStyle = "white";
                ctx.fillText(currentTile.numMines, tileWidth * col + (tileWidth/2) - 20, tileHeight * row + (tileHeight/2) + 20);
            }
            // Check if tile is revealed and is a mine
            else if (currentTile.revealed && currentTile.mine)
            {
                ctx.fillStyle = "red";
                ctx.fillText("M", tileWidth * col + (tileWidth/2) - 20, tileHeight * row + (tileWidth/2) + 20); //temporary placeholder for mine image
            }
            // Tile is not revealed and not flagged
            else
            {
                //ctx.fillStyle = "gray";
            }
            
        }
    }
}