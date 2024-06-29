type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // Does it exist? get()
        let node = this.lookup.get(key);
        if (!node) {
            // If no: Insert
            node = createNode(value);
            this.prepend(node);
            this.length++;
            this.trimCache();

            // Update the look ups
            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // If yes: update value and move to front
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }

        // Check capacity and evict
        this.trimCache();
    }

    get(key: K): V | undefined {
        // Check cache for existance
        const node = this.lookup.get(key);
        if (!node) return undefined;

        // Update value and move to front
        this.detach(node);
        this.prepend(node);

        // Return value or undefined
        return node.value;
    }

    private detach(node: Node<V>): void {
        // Connect nodes prev and next together
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        // Manage head and tail connections
        if (this.length === 0) this.head = this.tail = undefined;
        if (this.head === node) this.head = this.head.next;
        if (this.tail === node) this.tail = this.tail.prev;

        // Disconnect node from prev and next
        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        // Set to first node if no nodes in list
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        // Add to front of list
        node.next = this.head;
        // Set head back one
        this.head.prev = node;
        // Set node to fron
        this.head = node;
    }

    private trimCache(): void {
        // Check if above capacity
        if (this.length <= this.capacity) return;

        // Get tail
        const tail = this.tail as Node<V>;
        // Detach tail
        this.detach(this.tail as Node<V>);

        // Get and delete key and tail from end
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}