class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue(element) {
        this.elements.push(element);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function knightMoves(start, end) {
    const directions = [
        [-2, -1], [-1, -2], [1, -2], [2, -1],
        [-2, 1], [-1, 2], [1, 2], [2, 1]
    ];

    const isValidMove = (x, y) => x >= 0 && y >= 0 && x < 8 && y < 8;

    const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
    const queue = new Queue();

    queue.enqueue({ position: start, path: [start] });
    visited[start[0]][start[1]] = true;

    while (!queue.isEmpty()) {
        const { position, path } = queue.dequeue();

        if (position[0] === end[0] && position[1] === end[1]) {
            console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
            for (const step of path) {
                console.log(step);
            }
            return path;
        }

        for (const direction of directions) {
            const newX = position[0] + direction[0];
            const newY = position[1] + direction[1];

            if (isValidMove(newX, newY) && !visited[newX][newY]) {
                queue.enqueue({
                    position: [newX, newY],
                    path: [...path, [newX, newY]]
                });
                visited[newX][newY] = true;
            }
        }
    }

    console.log("No valid path found.");
    return null;
}

knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 3]);