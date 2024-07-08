import { calculateHookLengths, updateHooksetDisplay } from './hooks.js';
import { updatePartitionDisplay } from './partition.js';

export function createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor) {
    ferrersDiagram.innerHTML = ''; // Clear existing diagram
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let colIndex = 0; colIndex < 10; colIndex++) {
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
