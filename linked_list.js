class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    size() {
        return this.size;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }

    at(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }

    pop() {
        if (!this.head) {
            return null;
        }

        if (this.size === 1) {
            const removedNode = this.head;
            this.head = null;
            this.tail = null;
            this.size--;
            return removedNode;
        }

        let current = this.head;
        let previous = null;

        while (current.nextNode) {
            previous = current;
            current = current.nextNode;
        }

        this.tail = previous;
        this.tail.nextNode = null;
        this.size--;

        return current;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.value === value) {
                return index;
            }
            current = current.nextNode;
            index++;
        }

        return null;
    }

    toString() {
        let result = "";
        let current = this.head;

        while (current) {
            result += `(${current.value}) -> `;
            current = current.nextNode;
        }

        result += "null";
        return result;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) {
            return null;
        }

        const newNode = new Node(value);

        if (index === 0) {
            newNode.nextNode = this.head;
            this.head = newNode;
            if (!this.tail) {
                this.tail = newNode;
            }
        } else {
            let current = this.head;
            let previous = null;

            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.nextNode;
            }

            previous.nextNode = newNode;
            newNode.nextNode = current;

            if (!current) {
                this.tail = newNode;
            }
        }

        this.size++;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }

        let current = this.head;
        let previous = null;

        if (index === 0) {
            this.head = current.nextNode;
            if (!this.head) {
                this.tail = null;
            }
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.nextNode;
            }

            previous.nextNode = current.nextNode;

            if (!current.nextNode) {
                this.tail = previous;
            }
        }

        this.size--;
        return current;
    }
}

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.prepend(0);
linkedList.insertAt(1.5, 2);

console.log(linkedList.toString());

linkedList.removeAt(2);
console.log(linkedList.toString());  