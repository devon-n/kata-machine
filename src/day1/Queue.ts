type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;

    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        // Increment length
        this.length++;

        // Create the new node
        const newTail = { value: item } as Node<T>;
        if (!this.tail) {
            // If there is no tail, set the tail and head to new tail
            this.tail = this.head = newTail;
        } else {
            // Point tail to new tail and assign tail to new tail
            this.tail.next = newTail;
            this.tail = newTail;
        }
    }

    deque(): T | undefined {
        // If no head return undefined
        if (!this.head) return undefined;

        // Decrement length
        this.length--;
        // Store head in temp var
        const head = this.head;
        // Point head to the 2nd node
        this.head = this.head.next;
        // Remove previous head pointer
        head.next = undefined;

        // If queue is empty tail = undefined
        if (this.length === 0) this.tail = undefined;
        // return head value
        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
