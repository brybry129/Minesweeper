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
    canvas.addEventListener("click", canvasClicked)

    // Start new easy game
    newGame("easy");

    // Begin rendering
    window.requestAnimationFrame(render);
}

// Handles new game click event. Resets to a new game, resets game info paragraph
function newGame(difficulty)
{
    game = new MineGame(difficulty)

    const gameInfo = document.getElementById("gameInfo");
    gameInfo.textContent = "";
}

// Handles flag clicked event. Toggle flag button
function toggleFlag()
{
    flagOn = !flagOn;
}

// Handles canvas clicked events
function canvasClicked(event)
{
    // Get the canvas and bounding client rectangle
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();

    // Compute click coordinates, relative to canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.right;

    // Convert from pixel coordinates to row and column
    const row = Math.floor(y * game.rowCount / canvas.height);
    const col = Math.floor(x * game.colCount / canvas.width);

    // Call clickTile
    clickTile(row, col);
}

// Render game tiles
function render()
{

}

// Handles a click at a specific location. Checks if mine or number clicked and reveals it
function clickTile(rowIndex, colIndex)
{
    if (game.won)
    {
        return;
    }
}