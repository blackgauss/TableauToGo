document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');
    const partitionDisplay = document.createElement('div');
    partitionDisplay.id = 'partition-display';
    document.body.appendChild(partitionDisplay);

    function createFerrersDiagram(rows, cols) {
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.addEventListener('click', () => handleBoxClick(box, rowIndex, colIndex));
                row.appendChild(box);
            }
            ferrersDiagram.appendChild(row);
        }
    }

    function handleBoxClick(box, rowIndex, colIndex) {
        if (box.classList.contains('filled')) {
            box.classList.remove('filled');
        } else {
            if (isConnected(rowIndex, colIndex)) {
                box.classList.add('filled');
            }
        }
        calculateHookLengths();
        updatePartitionDisplay();
    }

    function isConnected(rowIndex, colIndex) {
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

    function updatePartitionDisplay() {
        const rows = document.querySelectorAll('.row');
        let partition = [];

        rows.forEach((row) => {
            let count = 0;
            row.querySelectorAll('.box.filled').forEach(() => {
                count++;
            });
            if (count > 0) {
                partition.push(count);
            }
        });

        if (isValidPartition(partition)) {
            partitionDisplay.innerHTML = '<h3>Partition:</h3>' + partition.join(' + ');
        } else {
            partitionDisplay.innerHTML = '<h3>Partition:</h3>Invalid Partition';
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

    createFerrersDiagram(10, 10); // Create a 10x10 grid
});
