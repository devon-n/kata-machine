export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {

    // Create arrays of seen and previous items
    const seen: boolean[] = new Array(graph.length).fill(false)
    const prev: number[] = new Array(graph.length).fill(-1)

    // Set starting point to seen
    seen[source] = true;
    // Create array to path find
    const q: number[] = [source]

    // While path find array has a length:
    while (q.length) {
        // Get and remove first element from path find array
        const curr = q.shift() as number

        // If needle is found: break
        if (curr === needle) break

        // Get adjacent points on graph
        const adjs = graph[curr]
        // For each adjacent point:
        for (let i = 0; i < adjs.length; i++) {

            // If seen return
            if (adjs[i] === 0 || seen[i]) continue

            // Set point to seen
            seen[i] = true
            // Set points parent to current
            prev[i] = curr
            // Add point to pathfind array
            q.push(i)
        }

        // Set current point to seen
        seen[curr] == true
    }

    // Initialize current
    let curr = needle
    // Create empty array for returned path
    const out: number[] = []

    // While current has a parent
    while (prev[curr] !== -1) {
        // Push current to path array
        out.push(curr)
        // Set current to its parent
        curr = prev[curr]
    }

    // If path exists return path
    if (out.length) return [source].concat(out.reverse())

    return null
}