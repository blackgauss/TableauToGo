import { calculateHookLength } from './hooks.js'; // Import calculateHookLength to use for the new drawing area

/**
 * Draws the atom partition diagram based on the given partition.
 * @param {number[]} partition - An array representing the partition of the atom.
 */
export function drawAtomPartition(partition) {
    const atomDiagram = document.getElementById('atom-diagram');
    atomDiagram.innerHTML = ''; // Clear existing diagram

    partition.forEach((rowLength, rowIndex) => {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let colIndex = 0; colIndex < rowLength; colIndex++) {
            const box = document.createElement('div');
            box.classList.add('box', 'filled', 'atom-box'); // Mark as filled and as an atom box for styling purposes
            box.textContent = ''; // Placeholder for hook length
            row.appendChild(box);
        }
        atomDiagram.appendChild(row);
    });

    // Calculate and display hook lengths
    calculateHookLengthsForAtomDiagram();
}

/**
 * Calculates the hook lengths for the atom diagram.
 */
function calculateHookLengthsForAtomDiagram() {
    const rows = document.querySelectorAll('#atom-diagram .row');
    rows.forEach((row, rowIndex) => {
        const boxes = row.children;
        for (let colIndex = 0; colIndex < boxes.length; colIndex++) {
            const hookLength = calculateHookLength(rows, rowIndex, colIndex);
            boxes[colIndex].textContent = hookLength;
        }
    });
}
