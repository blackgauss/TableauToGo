import { calculateHookLength } from './hooks.js'; // Import calculateHookLength to use for the new drawing area

export function drawAtomPartition(partition) {
    const atomDiagram = document.getElementById('atom-diagram');
    atomDiagram.innerHTML = ''; // Clear existing diagram

    partition.forEach((rowLength, rowIndex) => {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let colIndex = 0; colIndex < rowLength; colIndex++) {
            const box = document.createElement('div');
            box.classList.add('box', 'filled'); // Mark as filled for styling purposes
            box.textContent = ''; // Placeholder for hook length
            row.appendChild(box);
        }
        atomDiagram.appendChild(row);
    });

    // Calculate and display hook lengths
    calculateHookLengthsForAtomDiagram();
}

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
