class MineGame
{
    // Constructs a MineGame instance for correlating difficulty
    constructor(difficulty)
    {
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

    // Check if game is won
    get won()
    {
        // If all tiles except mine tiles revealed the game is won
        allTilesRevealed = true;
        for (let i = 0; i < this.rowCount; i++)
        {
            for (let j = 0; j < this.colCount; j++)
            {
                if (!this.gameGrid[i][j].revealed && !this.gameGrid[i][j].mine)
                {
                    allTilesRevealed = false;
                }
            }
        }
    }
}