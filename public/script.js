document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');
    const partitionDisplay = document.getElementById('partition-display');
    const hooksetDisplay = document.getElementById('hookset-display');
    const clearButton = document.getElementById('clear-button');
    const togglePartitionButton = document.getElementById('toggle-partition-button');
    const toggleHooksetButton = document.getElementById('toggle-hookset-button');
    const colorPicker = document.getElementById('color-picker');

    let currentColor = 'blue';

    clearButton.addEventListener('click', clearFerrersDiagram);
    togglePartitionButton.addEventListener('click', togglePartitionDisplay);
    toggleHooksetButton.addEventListener('click', toggleHooksetDisplay);

    colorPicker.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-box')) {
            currentColor = event.target.classList[1];
        }
    });

    function createFerrersDiagram(rows, cols) {
        ferrersDiagram.innerHTML = ''; // Clear existing diagram
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let colIndex = 0; colIndex < cols; colIndex++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.addEventListener('click', () => handleBoxClick(box, rowIndex, colIndex));
                box.addEventListener('touchstart', () => handleBoxClick(box, rowIndex, colIndex));
                row.appendChild(box);
            }
            ferrersDiagram.appendChild(row);
        }
    }

    function handleBoxClick(box, rowIndex, colIndex) {
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

    function updateHooksetDisplay() {
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

    function clearFerrersDiagram() {
        const rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            Array.from(row.children).forEach(box => {
                box.classList.remove('filled', 'blue', 'red', 'green', 'orange', 'black', 'gray');
                box.textContent = '';
            });
        });
        partitionDisplay.innerHTML = '<h3>Partition:</h3>';
        hooksetDisplay.innerHTML = '<h3>Hookset:</h3>';
    }

    function togglePartitionDisplay() {
        if (partitionDisplay.style.display === 'none') {
            partitionDisplay.style.display = 'block';
        } else {
            partitionDisplay.style.display = 'none';
        }
    }

    function toggleHooksetDisplay() {
        if (hooksetDisplay.style.display === 'none') {
            hooksetDisplay.style.display = 'block';
        } else {
            hooksetDisplay.style.display = 'none';
        }
    }

    createFerrersDiagram(10, 10); // Create a 10x10 grid
});
