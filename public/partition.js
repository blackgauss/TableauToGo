import { calculateHookLength, calculateHookLengths, updateHooksetDisplay } from './hooks.js';
import { clearFerrersDiagram } from './diagram.js';

export function togglePartitionDisplay() {
    if (partitionDisplay.style.display === 'none') {
        partitionDisplay.style.display = 'block';
    } else {
        partitionDisplay.style.display = 'none';
    }
}

export function toggleHooksetDisplay() {
    if (hooksetDisplay.style.display === 'none') {
        hooksetDisplay.style.display = 'block';
    } else {
        hooksetDisplay.style.display = 'none';
    }
}

export function updatePartitionDisplay() {
    const rows = Array.from(document.querySelectorAll('.row'));
    let partition = [];

    let leftMostColumn = null;

    for (let row of rows) {
        let count = 0;
        let firstFilled = null;

        for (let colIndex = 0; colIndex < row.children.length; colIndex++) {
            const box = row.children[colIndex];
            if (box.classList.contains('filled')) {
                if (firstFilled === null) {
                    firstFilled = colIndex;
                }
                count++;
            }
        }

        if (count > 0) {
            partition.push(count);
            if (leftMostColumn === null) {
                leftMostColumn = firstFilled;
            } else if (leftMostColumn !== firstFilled) {
                partitionDisplay.innerHTML = '<h3>Partition:</h3>Invalid Partition';
                hooksetDisplay.innerHTML = '';
                return;
            }
        }
    }

    if (isValidPartition(partition)) {
        partitionDisplay.innerHTML = '<h3>Partition:</h3>' + partition.join(' + ');
    } else {
        partitionDisplay.innerHTML = '<h3>Partition:</h3>Invalid Partition';
        hooksetDisplay.innerHTML = '';
    }
}

function isValidPartition(partition) {
    for (let i = 1; i < partition.length; i++) {
        if (partition[i] > partition[i - 1]) {
            return false;
        }
    }
    return true;
}

export function updateAtomMonoidPartition() {
    const firstColumnHooks = [];
    const rows = document.querySelectorAll('.row');

    // Extract hook numbers from the first column
    rows.forEach((row, rowIndex) => {
        const box = row.children[0];
        if (box.classList.contains('filled')) {
            firstColumnHooks.push(parseInt(box.textContent));
        }
    });

    // Create the walk and draw the partition
    const maxHook = Math.max(...firstColumnHooks);
    const walk = [];
    for (let i = 0; i <= maxHook; i++) {
        if (firstColumnHooks.includes(i)) {
            walk.push('up');
        } else {
            walk.push('right');
        }
    }

    // Draw the partition
    drawAtomMonoidPartition(walk);
}

function drawAtomMonoidPartition(walk) {
    const rows = document.querySelectorAll('.row');
    clearFerrersDiagram();
    let currentRow = 0;
    let currentCol = 0;

    walk.forEach(step => {
        if (step === 'up') {
            currentRow++;
        } else {
            currentCol++;
        }
        if (currentRow < rows.length && currentCol < rows[currentRow].children.length) {
            const box = rows[currentRow].children[currentCol];
            box.classList.add('filled', currentColor);
            box.textContent = calculateHookLength(rows, currentRow, currentCol);
        }
    });

    calculateHookLengths();
    updatePartitionDisplay();
    updateHooksetDisplay();
}
