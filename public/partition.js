export function togglePartitionDisplay() {
    const partitionDisplay = document.getElementById('partition-display');
    if (partitionDisplay.style.display === 'none') {
        partitionDisplay.style.display = 'block';
    } else {
        partitionDisplay.style.display = 'none';
    }
}

export function toggleHooksetDisplay() {
    const hooksetDisplay = document.getElementById('hookset-display');
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
                document.getElementById('partition-display').innerHTML = '<h3>Partition:</h3>Invalid Partition';
                document.getElementById('hookset-display').innerHTML = '';
                return;
            }
        }
    }

    if (isValidPartition(partition)) {
        document.getElementById('partition-display').innerHTML = '<h3>Partition:</h3>' + partition.join(' + ');
    } else {
        document.getElementById('partition-display').innerHTML = '<h3>Partition:</h3>Invalid Partition';
        document.getElementById('hookset-display').innerHTML = '';
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
