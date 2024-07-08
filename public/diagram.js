import { calculateHookLengths, updateHooksetDisplay } from './hooks.js';
import { updatePartitionDisplay } from './partition.js';

/**
 * Creates a Ferrers diagram and appends it to the specified element.
 * @param {HTMLElement} ferrersDiagram - The element to which the Ferrers diagram will be appended.
 * @param {boolean} isTouchDevice - Indicates whether the device is a touch device.
 * @param {string} currentColor - The color to be used for the boxes in the diagram.
 * @param {number} gridSize - The size of the grid (e.g., 10 for a 10x10 grid).
 */
export function createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor, gridSize) {
    ferrersDiagram.innerHTML = ''; // Clear existing diagram
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            const box = document.createElement('div');
            box.classList.add('box');
            if (isTouchDevice) {
                box.addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    handleBoxClick(box, rowIndex, colIndex, currentColor);
                });
            } else {
                box.addEventListener('click', () => handleBoxClick(box, rowIndex, colIndex, currentColor));
            }
            row.appendChild(box);
        }
        ferrersDiagram.appendChild(row);
    }
}

/**
 * Handles the click event on a box.
 * @param {HTMLElement} box - The clicked box element.
 * @param {number} rowIndex - The row index of the box.
 * @param {number} colIndex - The column index of the box.
 * @param {string} currentColor - The current color for the boxes.
 */
export function handleBoxClick(box, rowIndex, colIndex, currentColor) {
    if (box.classList.contains('filled')) {
        box.classList.remove('filled', currentColor);
    } else {
        if (isConnected(rowIndex, colIndex)) {
            box.classList.add('filled', currentColor);
        }
    }
    calculateHookLengths();
    updatePartitionDisplay();
    updateHooksetDisplay();
}

/**
 * Checks if a box at the specified row and column index is connected to any filled box.
 * @param {number} rowIndex - The row index of the box.
 * @param {number} colIndex - The column index of the box.
 * @returns {boolean} - True if the box is connected to any filled box, false otherwise.
 */
export function isConnected(rowIndex, colIndex) {
    const rows = document.querySelectorAll('.row');
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    // If it's the first box to be filled, allow it
    if (document.querySelectorAll('.box.filled').length === 0) {
        return true;
    }

    for (let [dx, dy] of directions) {
        const newRow = rowIndex + dx;
        const newCol = colIndex + dy;
        if (newRow >= 0 && newRow < rows.length && newCol >= 0 && newCol < rows[0].children.length) {
            if (rows[newRow].children[newCol].classList.contains('filled')) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Clears the Ferrers diagram by removing filled classes, resetting text content, and clearing partition and hookset displays.
 * @param {HTMLElement} ferrersDiagram - The Ferrers diagram element.
 */
export function clearFerrersDiagram(ferrersDiagram) {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        Array.from(row.children).forEach(box => {
            box.classList.remove('filled', 'blue', 'red', 'green', 'orange', 'black', 'gray');
            box.textContent = '';
        });
    });
    document.getElementById('partition-display').innerHTML = '<h3>Partition:</h3>';
    document.getElementById('hookset-display').innerHTML = '<h3>Hookset:</h3>';
}
