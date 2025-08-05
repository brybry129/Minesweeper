class MineGame
{
    // Constructs a MineGame instance for correlating difficulty
    constructor(difficulty)
    {
        this.lose = false;

        if (difficulty == "easy")
        {
            this.rowCount = 5;
            this.colCount = 5;
            this.mineCount = 5;
        }
        else if (difficulty == "medium")
        {
            this.rowCount = 10;
            this.colCount = 10;
            this.mineCount = 30;
        }
        else
        {
            this.rowCount = 25;
            this.colCount = 25;
            this.mineCount = 120;
        }

        // Allocate game area array with initial mine object
        this.gameGrid = [];
        for (let i=0; i < this.rowCount; i++)
        {
            for (let j=0; j < this.colCount; j++)
            {
                this.gameGrid[i][j] = 
                {
                    "mine": false,
                    "numMines": 0,
                    "flagged": false,
                    "revealed": false
                };
            }
            
        }

        // Randomly assign mines

    }

    // Assign the number of mines in random locations
    randomlyAssignMines() {
        // Assign mines to random location
        let minesAdded = 0;
        while (minesAdded < this.mineCount)
        {
            const randRow = Math.floor(Math.random() * this.rowCount);
            const randCol = Math.floor(Math.random() * this.colCount);

            if (!this.gameGrid[randRow][randCol].mine)
            {
                this.gameGrid[randRow][randCol].mine = true;
                minesAdded += 1;
            }
        }

        // Assign numbers next to mines
        for (let i = 0; i < this.rowCount; i++)
        {
            for (let j = 0; j < this.colCount; j++) 
            {  
                // If mine found, find all adjacent tiles
                if (this.gameGrid[i][j].mine)
                {
                    
                    // Left and right
                    this.increaseMineCount(i, j+1);
                    this.increaseMineCount(i, j-1);

                    // Up and down
                    this.increaseMineCount(i+1, j);
                    this.increaseMineCount(i-1, j);

                    // Diagonals
                    this.increaseMineCount(i-1,j-1) //top left
                    this.increaseMineCount(i-1,j+1) //top right
                    this.increaseMineCount(i+1,j-1) //bottom left
                    this.increaseMineCount(i+1,j+1) //bottom right

                }
            }
        }
    }

    // Increase mine count on adjacent tiles to a mine
    increaseMineCount(rowIndex, colIndex)
    {
        if (rowIndex < this.rowCount && rowIndex > 0 && colIndex < this.colCount && colIndex > 0)
        {
            this.gameGrid[rowIndex][colIndex].numMines++;
        }
    }

    // Reveals or flags tile clicked
    tileClicked(rowIndex, colIndex, flagOn)
    {
        // Check if game is already won or lost
        if (this.won || this.lose)
        {
            return;
        }

        // Get current values of tile
        currentRevealed = this.gameGrid[rowIndex][colIndex].revealed;
        currentFlagged = this.gameGrid[rowIndex][colIndex].flagged;
        currentMine = this.gameGrid[rowIndex][colIndex].mine;
        currentNumber = this.gameGride[rowIndex][colIndex].numMines;

        // If flag is off and tile is flagged then do nothing
        if (!flagOn && currentFlagged)
        {
            return;
        }
        // If flag is on and tile is not revealed then toggle flag
        else if (flagOn && !currentRevealed)
        {
            this.gameGrid[rowIndex][colIndex].flagged = !currentFlagged;
        }
        // If flag is not on, tile is not flagged and tile is not mine then reveal tile
        else if (!flagOn && !currentFlagged && !currentMine)
        {
            this.gameGrid[rowIndex][colIndex].revealed = true;

            // If tile is 0 tile i.e. has no mines touching it then reveal all adjacent tiles
            if (currentNumber == 0)
            {
                
            }
        }
    }

    // Check if game is won
    get won()
    {
        // If all tiles except mine tiles revealed the game is won
        allTilesRevealed = true;
        for (let i = 0; i < this.rowCount; i++)
        {
            for (let j = 0; j < this.colCount; j++)
            {
                // If tile is not revealed and is not a mine then game return false
                if (!this.gameGrid[i][j].revealed && !this.gameGrid[i][j].mine)
                {
                    allTilesRevealed = false;
                }
            }
        }
    }
}