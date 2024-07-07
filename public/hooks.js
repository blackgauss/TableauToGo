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

    hooksetDisplay.innerHTML = '<h3>Hookset:</h3>' + Array.from(hookset).sort((a, b) => a - b).join(', ');
}
