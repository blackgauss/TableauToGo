import { createFerrersDiagram, clearFerrersDiagram } from './diagram.js';
import { computeAndDisplayAtomMonoid } from './atom_monoid.js';

document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');
    const gridSizeSelector = document.getElementById('grid-size-selector');
    const clearButton = document.getElementById('clear-button');
    const computeAtomMonoidButton = document.getElementById('compute-atom-monoid-button');
    const settingsIcon = document.getElementById('settings-icon');
    const toggleInfoButton = document.getElementById('toggle-info-button');
    const controls = document.getElementById('controls');
    const sidebar = document.getElementById('sidebar');
    const atomDiagram = document.getElementById('atom-diagram');
    let currentColor = 'blue';
    let isTouchDevice = 'ontouchstart' in document.documentElement;

    // Function to set bounding box size
    function setBoundingBoxSize(gridSize) {
        const boxSize = 34; // 30px box + 2px margin on each side
        const diagramSize = boxSize * gridSize + 20; // Adjust for padding
        ferrersDiagram.style.width = `${diagramSize}px`;
        ferrersDiagram.style.height = `${diagramSize}px`;
        atomDiagram.style.width = `${diagramSize}px`;
        atomDiagram.style.height = `${diagramSize}px`;
    }

    // Create initial diagram with default size 5x5
    createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor, 5);
    setBoundingBoxSize(5);

    // Handle grid size changes
    gridSizeSelector.addEventListener('change', () => {
        const newSize = parseInt(gridSizeSelector.value);
        clearFerrersDiagram(ferrersDiagram);
        createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor, newSize);
        setBoundingBoxSize(newSize);
    });

    // Handle clear button
    clearButton.addEventListener('click', () => {
        clearFerrersDiagram(ferrersDiagram);
        atomDiagram.innerHTML = ''; // Clear atom diagram
    });

    // Handle compute atom monoid button
    computeAtomMonoidButton.addEventListener('click', () => {
        atomDiagram.innerHTML = ''; // Clear atom diagram
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

    // Handle info toggle button
    toggleInfoButton.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });
});
