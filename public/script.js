import { createFerrersDiagram, clearFerrersDiagram } from './diagram.js';
import { computeAndDisplayAtomMonoid } from './atom_monoid.js';

document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');
    const gridSizeSelector = document.getElementById('grid-size-selector');
    const clearButton = document.getElementById('clear-button');
    const computeAtomMonoidButton = document.getElementById('compute-atom-monoid-button');
    const settingsIcon = document.getElementById('settings-icon');
    const controls = document.getElementById('controls');
    let currentColor = 'blue';
    let isTouchDevice = 'ontouchstart' in document.documentElement;

    // Create initial diagram
    createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor, parseInt(gridSizeSelector.value));

    // Handle grid size changes
    gridSizeSelector.addEventListener('change', () => {
        const newSize = parseInt(gridSizeSelector.value);
        clearFerrersDiagram(ferrersDiagram);
        createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor, newSize);
    });

    // Handle clear button
    clearButton.addEventListener('click', () => {
        clearFerrersDiagram(ferrersDiagram);
    });

    // Handle compute atom monoid button
    computeAtomMonoidButton.addEventListener('click', () => {
        computeAndDisplayAtomMonoid();
    });

    // Handle color selection
    document.querySelectorAll('.color-box').forEach(colorBox => {
        colorBox.addEventListener('click', () => {
            currentColor = colorBox.classList[1]; // Get the color from the class name
        });
    });

    // Handle settings icon click
    settingsIcon.addEventListener('click', () => {
        controls.classList.toggle('hidden');
    });
});
