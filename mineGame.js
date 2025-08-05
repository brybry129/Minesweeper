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
        for (let row=0; row < this.rowCount; row++)
        {
            this.gameGrid[row] = [];
            for (let col=0; col < this.colCount; col++)
            {
                this.gameGrid[row][col] = 
                {
                    mine: false,
                    numMines: 0,
                    flagged: false,
                    revealed: false
                };
                //console.log(this.gameGrid[row][col]);
            }
            
        }

        // Randomly assign mines
        this.randomlyAssignMines()
        //console.log(this.gameGrid);

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
        for (let row = 0; row < this.rowCount; row++)
        {
            for (let col = 0; col < this.colCount; col++) 
            {  
                // If mine found, find all adjacent tiles
                if (this.gameGrid[row][col].mine)
                {
                    
                    // Left and right
                    this.increaseMineCount(row, col+1);
                    this.increaseMineCount(row, col-1);

                    // Up and down
                    this.increaseMineCount(row+1, col);
                    this.increaseMineCount(row-1, col);

                    // Diagonals
                    this.increaseMineCount(row-1,col-1) //top left
                    this.increaseMineCount(row-1,col+1) //top right
                    this.increaseMineCount(row+1,col-1) //bottom left
                    this.increaseMineCount(row+1,col+1) //bottom right

                }
            }
        }
    }

    // Increase mine count on adjacent tiles to a mine
    increaseMineCount(rowIndex, colIndex)
    {
        if (rowIndex < this.rowCount && rowIndex > 0 && colIndex < this.colCount && colIndex > 0 && !this.gameGrid[rowIndex][colIndex].mine)
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

        // Get the tile that was clicked
        //console.log(rowIndex + ", " + colIndex)
        let currentTile = this.getTile(rowIndex, colIndex);
        console.log(currentTile);

        // If flag is off and tile is flagged then do nothing
        if (!flagOn && currentTile.flagged)
        {
            return;
        }
        // If flag is on and tile is not revealed then toggle flag
        else if (flagOn && !currentTile.revealed)
        {
            this.gameGrid[rowIndex][colIndex].flagged = !currentTile.flagged;
        }
        // If flag is not on, tile is not flagged and tile is not mine then reveal tile
        else if (!flagOn && !currentTile.flagged && !currentTile.mine)
        {
            this.gameGrid[rowIndex][colIndex].revealed = true;

            // If tile is 0 tile i.e. has no mines touching it then reveal all adjacent tiles
            if (currentTile.numMines == 0)
            {
                //ADD THIS!!!!!
            }
        }
        // if flag is off and tile is mine then set lose boolean and reveal all mines
        else if (!flagOn && currentTile.mine)
        {
            this.lose = true;

            // Reveal all mines
            this.revealMines();
        }
    }

    getTile(rowIndex, colIndex)
    {
        //console.log(this.gameGrid[rowIndex][colIndex]);
        return this.gameGrid[rowIndex][colIndex];
    }

    // Reveal all mines
    revealMines()
    {
        for (let row = 0; row < this.rowCount; row++)
        {
            for (let col = 0; col < this.colCount; col++)
            {
                this.gameGrid[row][col].revealed = true;
            }
        }
    }

    // Check if game is won
    get won()
    {
        // If all tiles except mine tiles revealed the game is won
        let allTilesRevealed = true;
        for (let row = 0; row < this.rowCount; row++)
        {
            for (let col = 0; col < this.colCount; col++)
            {
                let currentTile = this.getTile(row, col);
                // If tile is not revealed and is not a mine then game return false
                if (!currentTile.revealed && !currentTile.mine)
                {
                    allTilesRevealed = false;
                }
            }
        }

        return allTilesRevealed;
    }
}