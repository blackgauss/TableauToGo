document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');

    function createFerrersDiagram(rows, cols) {
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.addEventListener('click', () => handleBoxClick(box));
                row.appendChild(box);
            }
            ferrersDiagram.appendChild(row);
        }
    }

    function handleBoxClick(box) {
        box.classList.toggle('filled');
        calculateHookLengths();
    }

    function calculateHookLengths() {
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

    function calculateHookLength(rows, rowIndex, colIndex) {
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

    createFerrersDiagram(10, 10); // Create a 10x10 grid
});
