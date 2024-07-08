import { extractHookset } from './hooks.js';
import { computeAtomMonoidPartition } from './atom_monoid_calculation.js';
import { drawAtomPartition } from './atom_monoid_display.js';

/**
 * Computes and displays the Atom Monoid.
 */
export function computeAndDisplayAtomMonoid() {
    /**
     * Extracts the hookset.
     * @returns {Array} The extracted hookset.
     */
    const hookset = extractHookset();
    console.log('Hookset:', hookset); // Log hookset

    if (hookset.length === 0) {
        document.getElementById('atom-partition-display').innerHTML = '<h3>Atom Partition:</h3>';
        return;
    }

    /**
     * Computes the Atom Monoid partition.
     * @param {Array} hookset - The hookset to compute the partition from.
     * @returns {Array} The computed partition.
     */
    const partition = computeAtomMonoidPartition(hookset);
    console.log('Computed Partition:', partition); // Log partition

    displayPartition(partition);
    drawAtomPartition(partition); // Draw the partition
}

/**
 * Displays the given partition on the web page.
 *
 * @param {Array} partition - The partition to be displayed.
 * @returns {void}
 */
function displayPartition(partition) {
    const partitionDisplay = document.getElementById('atom-partition-display');
    if (partition.length === 0) {
        partitionDisplay.innerHTML = '<h3>Atom Partition:</h3>';
    } else {
        partitionDisplay.innerHTML = '<h3>Atom Partition:</h3>' + partition.join(' + ');
    }
    console.log('Atom Partition Display:', partitionDisplay.innerHTML); // Log display
}
