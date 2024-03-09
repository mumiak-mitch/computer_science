class Node {
    constructor(key, value = null) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = new Node(key, value);
            this.size++;
        } else {
            let currentNode = this.buckets[index];

            while (currentNode.next) {
                if (currentNode.key === key) {
                    currentNode.value = value;
                    return;
                }
                currentNode = currentNode.next;
            }

            if (currentNode.key === key) {
                currentNode.value = value;
            } else {
                currentNode.next = new Node(key, value);
                this.size++;
            }
        }

        if (this.size / this.buckets.length > this.loadFactor) {
            this.grow();
        }
    }

    get(key) {
        const index = this.hash(key);

        let currentNode = this.buckets[index];
        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);

        let currentNode = this.buckets[index];
        while (currentNode) {
            if (currentNode.key === key) {
                return true;
            }
            currentNode = currentNode.next;
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);

        let currentNode = this.buckets[index];
        let previousNode = null;

        while (currentNode) {
            if (currentNode.key === key) {
                if (previousNode) {
                    previousNode.next = currentNode.next;
                } else {
                    this.buckets[index] = currentNode.next;
                }
                this.size--;
                return true;
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.buckets.length);
        this.size = 0;
    }

    keys() {
        const result = [];
        for (const bucket of this.buckets) {
            let currentNode = bucket;
            while (currentNode) {
                result.push(currentNode.key);
                currentNode = currentNode.next;
            }
        }
        return result;
    }

    values() {
        const result = [];
        for (const bucket of this.buckets) {
            let currentNode = bucket;
            while (currentNode) {
                result.push(currentNode.value);
                currentNode = currentNode.next;
            }
        }
        return result;
    }

    entries() {
        const result = [];
        for (const bucket of this.buckets) {
            let currentNode = bucket;
            while (currentNode) {
                result.push([currentNode.key, currentNode.value]);
                currentNode = currentNode.next;
            }
        }
        return result;
    }

    grow() {
        const newCapacity = this.buckets.length * 2;
        const newBuckets = new Array(newCapacity);

        for (const bucket of this.buckets) {
            let currentNode = bucket;
            while (currentNode) {
                const newIndex = this.hash(currentNode.key, newCapacity);
                if (!newBuckets[newIndex]) {
                    newBuckets[newIndex] = new Node(currentNode.key, currentNode.value);
                } else {
                    let newBucketNode = newBuckets[newIndex];
                    while (newBucketNode.next) {
                        newBucketNode = newBucketNode.next;
                    }
                    newBucketNode.next = new Node(currentNode.key, currentNode.value);
                }
                currentNode = currentNode.next;
            }
        }

        this.buckets = newBuckets;
    }
}

class HashSet extends HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        super(initialCapacity, loadFactor);
    }

    set(key) {
        super.set(key, null);
    }
}


const hashMap = new HashMap();
hashMap.set("John", 25);
hashMap.set("Alice", 30);
hashMap.set("Bob", 22);

console.log(hashMap.get("John"));
console.log(hashMap.keys());

const hashSet = new HashSet();
hashSet.set("Apple");
hashSet.set("Banana");
hashSet.set("Orange");

console.log(hashSet.has("Apple"));
console.log(hashSet.values());  