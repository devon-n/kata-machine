export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // Structural Check
    if (a === null && b === null) return true;
    // Structural Check
    if (a === null || b === null) return false;
    // Value Check
    if (a.value !== b.value) return false;

    return compare(a.left, b.left) && compare(a.right, b.right);
}
