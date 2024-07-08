import { extractHookset } from './hooks.js';
import { computeAtomMonoidPartition } from './atom_monoid_calculation.js';
import { drawAtomPartition } from './atom_monoid_display.js';

export function computeAndDisplayAtomMonoid() {
    const hookset = extractHookset();
    console.log('Hookset:', hookset); // Log hookset
    if (hookset.length === 0) {
        document.getElementById('atom-partition-display').innerHTML = '<h3>Atom Partition:</h3>';
        return;
    }
    const partition = computeAtomMonoidPartition(hookset);
    console.log('Computed Partition:', partition); // Log partition
    displayPartition(partition);
    drawAtomPartition(partition); // Draw the partition
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
