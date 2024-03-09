function fibs(n) {
    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

const resultIterative = fibs(8);
console.log(resultIterative); 