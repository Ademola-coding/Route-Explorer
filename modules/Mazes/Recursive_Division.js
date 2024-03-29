import { Matrix, row_col } from "../grid_Matrix.js";

const [rols, cols] = row_col()

const defaultMatrix = Matrix()

export const Recursive_Division = () => {

    const clearBlocks = document.querySelectorAll(".block")
    clearBlocks.forEach(clas => {
        clas.classList.remove('block')
    });

    // 2D array Matrix to Insert Maze 
    // Recursive Division maze generator
    const mazeGenerator  = (x1, y1, x2, y2) => {

        // Base case
        if (x2 - x1 <= 2 || y2 - y1 <= 2) {
            return;
        }

        const horizontal = Math.random() < 0.5;

        const wallX = horizontal ? x1 : x1 + Math.floor(Math.random() * Math.random() * (x2 - x1 - 1)) + 1;
        const wallY = horizontal ? y1 + Math.floor(Math.random() * Math.random() * (y2 - y1 - 1)) + 1 : y1;

        const passageX = horizontal ? wallX : x1 + Math.floor(Math.random() * Math.random() * (x2 - x1));
        const passageY = horizontal ? y1 + Math.floor(Math.random() * Math.random() * (y2 - y1)) : wallY;

        for (let y = y1; y < y2; y++) {
            for (let x = x1; x < x2; x++) {
                if (horizontal && y === wallY && (x < wallX || x > passageX)) {
                    defaultMatrix[y][x] = 1;
                    if (defaultMatrix[y][x] === 1) {
                        document.getElementById(`cell${y}${x}`).classList.add('block')       
                    }
                } else if (!horizontal && x === wallX && (y < wallY || y > passageY)) {
                    defaultMatrix[y][x] = 1;
                    if (defaultMatrix[y][x] === 1) {
                            document.getElementById(`cell${y}${x}`).classList.add('block')
                       }
                }
            }
        }
        
        mazeGenerator(x1, y1, horizontal ? x2 : wallX + 1, horizontal ? wallY + 1 : y2);
        mazeGenerator(horizontal ? x1 : wallX + 1, horizontal ? wallY + 1 : y1, x2, y2);
    }

    mazeGenerator(0, 0, cols, rols);

    return  defaultMatrix;
}
