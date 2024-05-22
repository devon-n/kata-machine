function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return;

    // Get pivot index from array
    const pivotIdx = partition(arr, lo, hi);

    // Recurse on left and right side of array (pivot)
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    // Identify a pivot
    const pivot = arr[hi];

    // Start at the lo point (beginning)
    let idx = lo - 1;

    // Loop through the sub array
    for (let i = lo; i < hi; i++) {
        // If the current i <= pivot
        if (arr[i] <= pivot) {
            // Move the i to the beginning of sub array
            // Increment idx for next move
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    // Increment idx
    // Move pivot to end of sub array
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    // Return idx for next iteration
    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
