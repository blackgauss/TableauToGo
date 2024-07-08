/**
 * Calculates the hook lengths for each filled box in the table.
 */
export function calculateHookLengths() {
    const rows = document.querySelectorAll('.row');
    rows.forEach((row, rowIndex) => {
        const boxes = row.children;
        for (let colIndex = 0; colIndex < boxes.length; colIndex++) {
            if (boxes[colIndex].classList.contains('filled')) {
                const hookLength = calculateHookLength(rows, rowIndex, colIndex);
                boxes[colIndex].textContent = hookLength;
            } else {
                boxes[colIndex].textContent = '';
            }
        }
    });
}

/**
 * Calculates the length of a hook starting from a given row and column index.
 * A hook is defined as a consecutive series of filled cells to the right and downwards.
 * @param {Array} rows - The array of rows containing the cells.
 * @param {number} rowIndex - The index of the starting row.
 * @param {number} colIndex - The index of the starting column.
 * @returns {number} - The length of the hook.
 */
export function calculateHookLength(rows, rowIndex, colIndex) {
    let hookLength = 1;
    
    // Count to the right
    for (let i = colIndex + 1; i < rows[rowIndex].children.length; i++) {
        if (rows[rowIndex].children[i].classList.contains('filled')) {
            hookLength++;
        } else {
            break;
        }
    }
    
    // Count downwards
    for (let i = rowIndex + 1; i < rows.length; i++) {
        if (rows[i].children[colIndex].classList.contains('filled')) {
            hookLength++;
        } else {
            break;
        }
    }
    
    return hookLength;
}

/**
 * Updates the hookset display by collecting the values from the filled boxes and sorting them.
 */
export function updateHooksetDisplay() {
    const rows = document.querySelectorAll('.row');
    let hookset = new Set();

    rows.forEach((row) => {
        const boxes = row.children;
        for (let colIndex = 0; colIndex < boxes.length; colIndex++) {
            if (boxes[colIndex].classList.contains('filled')) {
                hookset.add(parseInt(boxes[colIndex].textContent));
            }
        }
    });

    document.getElementById('hookset-display').innerHTML = '<h3>Hookset:</h3>' + Array.from(hookset).sort((a, b) => a - b).join(', ');
}

/**
 * Extracts the unique values from the filled boxes in the table.
 * @returns {number[]} An array of unique values extracted from the filled boxes.
 */
export function extractHookset() {
    const rows = document.querySelectorAll('.row');
    let hookset = new Set();

    rows.forEach((row) => {
        const boxes = row.children;
        for (let colIndex = 0; colIndex < boxes.length; colIndex++) {
            if (boxes[colIndex].classList.contains('filled')) {
                hookset.add(parseInt(boxes[colIndex].textContent));
            }
        }
    });

    return Array.from(hookset);
}
