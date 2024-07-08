import { extractHookset } from './hooks.js';

export function computeAtomMonoid() {
    const hookset = extractHookset();
    console.log('Hookset:', hookset); // Log hookset
    if (hookset.length === 0) {
        document.getElementById('atom-partition-display').innerHTML = '<h3>Atom Partition:</h3>';
        return;
    }
    const partition = createPartitionFromHookset(hookset);
    console.log('Computed Partition:', partition); // Log partition
    displayPartition(partition);
}

function createPartitionFromHookset(hookset) {
    if (hookset.length === 0) return [];

    hookset.sort((a, b) => a - b);

    let currentStep = 0;
    let partition = [];
    let currentRow = 0;
    while (currentStep <= Math.max(...hookset)) {
        for (let i = currentStep; i <= Math.max(...hookset); i++) {
            if (hookset.includes(i)) {
                partition.push(currentRow); // Add current row to partition before breaking
                currentStep = i + 1;
                break;
            }
            currentRow += 1;
        }
    }

    // Ensure the partition is in descending order
    partition.sort((a, b) => b - a);

    return partition;
}

function displayPartition(partition) {
    const partitionDisplay = document.getElementById('atom-partition-display');
    if (partition.length === 0) {
        partitionDisplay.innerHTML = '<h3>Atom Partition:</h3>';
    } else {
        partitionDisplay.innerHTML = '<h3>Atom Partition:</h3>' + partition.join(' + ');
    }
    console.log('Atom Partition Display:', partitionDisplay.innerHTML); // Log display
}
