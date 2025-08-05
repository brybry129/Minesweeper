class MineGame
{
    //Constructs a MineGame instance for correlating difficulty
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

        //Allocate game area array with initial mine object
        this.gameGrid = [];
        for (let i=0; i < this.rowCount; i++)
        {
            for (let j=0; j < this.colCount; j++)
            {
                this.gameGrid[i][j] = 
                {
                    "mine": false,
                    "numMines": 0
                };
            }
            
        }

        //Assign mines to random location
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

        //Assign numbers next to mines
        for (let i = 0; i < this.rowCount; i++)
        {
            for (let j = 0; j < this.colCount; j++) 
                
                // if mine found, find all adjacent tiles
                if (this.gameGrid[i][j].mine)
                {
                    
                }
        }
    }
}