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
            this.mineCount = 25;
        }
        else
        {
            this.rowCount = 25;
            this.colCount = 25;
            this.mineCount = 120;
        }

        this.numFlags = this.mineCount;
        this.winScore = this.rowCount * this.colCount - this.mineCount;

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
        if (rowIndex < this.rowCount && rowIndex >= 0 && colIndex < this.colCount && colIndex >= 0 && !this.gameGrid[rowIndex][colIndex].mine)
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
        //console.log(currentTile);

        // If flag is off and tile is flagged then do nothing
        if (!flagOn && currentTile.flagged)
        {
            return;
        }
        // If flag is on and tile is not revealed then toggle flag
        else if (flagOn && !currentTile.revealed)
        {
            if (this.gameGrid[rowIndex][colIndex].flagged)
            {
                this.numFlags++;
            }
            else
            {
                this.numFlags--;
            }
            this.gameGrid[rowIndex][colIndex].flagged = !currentTile.flagged;
        }
        // If flag is not on, tile is not flagged and tile is not mine then reveal tile
        else if (!flagOn && !currentTile.flagged && !currentTile.mine)
        {
            // If tile is 0 tile i.e. has no mines touching it then reveal all adjacent tiles until number higher than 0
            if (currentTile.numMines == 0)
            {
                //Recursive method
                this.revealAdjacentZeros(rowIndex, colIndex);
            }
            else
            {
                this.gameGrid[rowIndex][colIndex].revealed = true;
            }
        }
        // if flag is off and tile is mine then set lose boolean and reveal all mines
        else if (!flagOn && currentTile.mine)
        {
            // Reveal all mines
            this.revealMines();
            this.lose = true;
        }
    }

    // Return the tile object at specified row and column index
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
                let currentTile = this.getTile(row, col);
                if (currentTile.mine)
                {
                    this.gameGrid[row][col].revealed = true;
                }
            }
        }
    }

    // Return the score, i.e. number of non-mine tiles clicked
    get score()
    {
        let numTiles = 0;
        for (let row = 0; row < this.rowCount; row++)
        {
            for (let col = 0; col < this.colCount; col++)
            {
                let currentTile = this.getTile(row, col);
                if (currentTile.revealed && !currentTile.mine)
                {
                    numTiles++;
                }
            }
        }
        return numTiles;
    }

    revealAdjacentZeros(rowIndex, colIndex)
    {
        // Check for invalid index
        if (rowIndex >= this.rowCount || rowIndex < 0 || colIndex >= this.colCount || colIndex < 0)
        {
            return;
        }

        let currentTile = this.getTile(rowIndex, colIndex);
        console.log(currentTile);

        // Check if tile is already revealed
        if (currentTile.revealed)
        {
            return;
        }
        // Check if tile is touching a mine
        else if (currentTile.numMines > 0)
        {
            this.gameGrid[rowIndex][colIndex].revealed = true;
            return;
        }
        else
        {
            this.gameGrid[rowIndex][colIndex].revealed = true;
            // Check left and right paths
            this.revealAdjacentZeros(rowIndex, colIndex+1);
            this.revealAdjacentZeros(rowIndex, colIndex-1)

            // Check up and down paths
            this.revealAdjacentZeros(rowIndex+1, colIndex)
            this.revealAdjacentZeros(rowIndex-1, colIndex);

            // Check diagonal paths
            this.revealAdjacentZeros(rowIndex-1, colIndex-1); // top left
            this.revealAdjacentZeros(rowIndex-1, colIndex+1); // top right
            this.revealAdjacentZeros(rowIndex+1, colIndex-1); // bottom left
            this.revealAdjacentZeros(rowIndex+1, colIndex+1); // bottom right

        }
    }

    // Check if game is won
    get won()
    {
        // If all tiles except mine tiles revealed the game is won
        let score = this.score;
        if (score == this.winScore)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}