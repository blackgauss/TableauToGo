import { createFerrersDiagram, clearFerrersDiagram } from './diagram.js';
import { togglePartitionDisplay, toggleHooksetDisplay } from './partition.js';
import { computeAtomMonoid } from './atom_monoid.js';

document.addEventListener('DOMContentLoaded', () => {
    const ferrersDiagram = document.getElementById('ferrers-diagram');
    const clearButton = document.getElementById('clear-button');
    const togglePartitionButton = document.getElementById('toggle-partition-button');
    const toggleHooksetButton = document.getElementById('toggle-hookset-button');
    const colorPicker = document.getElementById('color-picker');
    const computeAtomMonoidButton = document.getElementById('compute-atom-monoid-button');

    let currentColor = 'blue';
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    clearButton.addEventListener('click', () => clearFerrersDiagram(ferrersDiagram));
    togglePartitionButton.addEventListener('click', togglePartitionDisplay);
    toggleHooksetButton.addEventListener('click', toggleHooksetDisplay);
    computeAtomMonoidButton.addEventListener('click', () => computeAtomMonoid());

    colorPicker.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-box')) {
            currentColor = event.target.classList[1];
        }
    });

    createFerrersDiagram(ferrersDiagram, isTouchDevice, currentColor);
});
