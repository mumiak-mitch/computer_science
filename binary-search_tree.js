class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        }

        const midIndex = Math.floor(array.length / 2);
        const root = new Node(array[midIndex]);

        root.left = this.buildTree(array.slice(0, midIndex));
        root.right = this.buildTree(array.slice(midIndex + 1));

        return root;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    deleteItem(value) {
        this.root = this._deleteItem(this.root, value);
    }

    _deleteItem(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this._deleteItem(node.left, value);
        } else if (value > node.data) {
            node.right = this._deleteItem(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.data = this._findMin(node.right).data;
            node.right = this._deleteItem(node.right, node.data);
        }

        return node;
    }

    find(value) {
        return this._find(this.root, value);
    }

    _find(node, value) {
        if (node === null || node.data === value) {
            return node;
        }

        if (value < node.data) {
            return this._find(node.left, value);
        } else {
            return this._find(node.right, value);
        }
    }

    levelOrder(callback = null) {
        if (this.root === null) {
            return [];
        }

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            result.push(callback ? callback(currentNode) : currentNode.data);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return result;
    }

    inOrder(callback = null) {
        return this._inOrder(this.root, callback);
    }

    _inOrder(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];
        result.push(...this._inOrder(node.left, callback));
        result.push(callback ? callback(node) : node.data);
        result.push(...this._inOrder(node.right, callback));

        return result;
    }

    preOrder(callback = null) {
        return this._preOrder(this.root, callback);
    }

    _preOrder(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];
        result.push(callback ? callback(node) : node.data);
        result.push(...this._preOrder(node.left, callback));
        result.push(...this._preOrder(node.right, callback));

        return result;
    }

    postOrder(callback = null) {
        return this._postOrder(this.root, callback);
    }

    _postOrder(node, callback) {
        if (node === null) {
            return [];
        }

        const result = [];
        result.push(...this._postOrder(node.left, callback));
        result.push(...this._postOrder(node.right, callback));
        result.push(callback ? callback(node) : node.data);

        return result;
    }

    height(node = this.root) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (node === null) {
            return -1;
        }

        return this._depth(node, this.root);
    }

    _depth(node, current) {
        if (current === null) {
            return -1;
        }

        if (current === node) {
            return 0;
        }

        const leftDepth = this._depth(node, current.left);
        const rightDepth = this._depth(node, current.right);

        if (leftDepth >= 0) {
            return leftDepth + 1;
        } else if (rightDepth >= 0) {
            return rightDepth + 1;
        }

        return -1;
    }

    isBalanced() {
        return this._isBalanced(this.root);
    }

    _isBalanced(node) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this._isBalanced(node.left) && this._isBalanced(node.right);
    }

    rebalance() {
        const nodes = this.inOrder();
        this.root = this.buildTree(nodes);
    }
}

// Driver script
const getRandomNumbers = (count, max) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(Math.floor(Math.random() * max));
    }
    return result;
};

const numbers = getRandomNumbers(10, 100);
const bst = new Tree(numbers);

console.log("Is Balanced:", bst.isBalanced());
console.log("Level Order:", bst.levelOrder());
console.log("Pre Order:", bst.preOrder());
console.log("Post Order:", bst.postOrder());
console.log("In Order:", bst.inOrder());

// Unbalance the tree
const unbalancedNumbers = getRandomNumbers(5, 200);
for (const number of unbalancedNumbers) {
    bst.insert(number);
}

console.log("Is Balanced:", bst.isBalanced());

// Rebalance the tree
bst.rebalance();

console.log("Is Balanced:", bst.isBalanced());
console.log("Level Order:", bst.levelOrder());
console.log("Pre Order:", bst.preOrder());
console.log("Post Order:", bst.postOrder());
console.log("In Order:", bst.inOrder());  