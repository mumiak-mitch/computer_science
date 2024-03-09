function fibsRec(n) {
    if (n === 0) {
        return [];
    } else if (n === 1) {
        return [0];
    } else if (n === 2) {
        return [0, 1];
    } else {
        const prevFibs = fibsRec(n - 1);
        prevFibs.push(prevFibs[prevFibs.length - 1] + prevFibs[prevFibs.length - 2]);
        return prevFibs;
    }
}

const resultRecursive = fibsRec(8);
console.log(resultRecursive); 