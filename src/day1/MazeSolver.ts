const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Base cases
    // Is off map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze[1].length
    ) {
        return false;
    }

    // Is wall
    if (maze[curr.y][curr.x] === wall) return false;

    // Is end
    if (curr.y === end.y && curr.x === end.x) {
        path.push(end);
        return true;
    }

    // Is seen
    if (seen[curr.y][curr.x] === true) return false;

    // Recurse
    // 1. Pre
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // 2. Recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }
    // 3. Post
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);
    console.log(maze);
    console.log(path);
    return path;
}
