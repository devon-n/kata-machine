export default function bs_list(haystack: number[], needle: number): boolean {
    // Init low and high indexes
    let low = 0;
    let high = haystack.length;

    // While low is less than high
    while (low < high) {
        // Get midpoint and value of haystack midpoint
        const midpoint = Math.floor(low + (high - low) / 2);
        const value = haystack[midpoint];

        // If need is found: return true
        if (value === needle) {
            return true;
            // If value is > needle split right half of array
        } else if (value > needle) {
            high = midpoint;

            // If value < needle split left half of array
        } else if (value < needle) {
            low = midpoint + 1;
        }
    }

    return false;
}
