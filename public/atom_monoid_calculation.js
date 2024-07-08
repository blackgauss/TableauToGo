export function computeAtomMonoidPartition(hookset) {
    if (hookset.length === 0) return [];

    hookset.sort((a, b) => a - b);

    let currentStep = 0;
    let partition = [];
    let currentRow = 0; // Initialize currentRow before the while loop

    while (currentStep <= Math.max(...hookset)) {
        for (let i = currentStep; i <= Math.max(...hookset); i++) {
            if (hookset.includes(i)) {
                partition.push(currentRow); // Add current row to partition before breaking
                currentStep = i + 1; // Correct assignment here to move to next step
                break;
            }
            currentRow += 1;
        }
    }

    // Ensure the partition is in descending order
    partition.sort((a, b) => b - a);

    return partition;
}