type Node = {
    value: any;
    next: Node | undefined;
    prev: Node | undefined;
};

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node | undefined;
    public tail?: Node | undefined;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;

        // G => A
        const node = { value: item, next: this.head, prev: undefined } as Node;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        // A => G
        this.head.prev = node;

        // head => G
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Index > Length");
        }
        if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length) {
            this.append(item);
        }

        this.length++;
        const curr = this.getAt(idx) as Node;
        const node = { value: item } as Node;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = curr;
        }

        // MY CODE
        // if (idx > this.length) throw new Error("Index > Length");

        // const node = { value: item } as Node;
        // this.length++;
        // if (!this.head) {
        //     this.head = node;
        //     return;
        // }
        // if (!this.head.next) {
        //     this.head.next = node;
        //     return;
        // }
        // // Traverse the list to get idx

        // // a => b => c
        // let idxBefore: Node = this.head;
        // let idxAfter: Node = this.head.next;
        // for (let i = 0; i < idx; ++i) {
        //     if (!idxBefore.next) {
        //         idxBefore.next = node;
        //     } else {
        //         idxAfter = idxBefore.next;
        //         idxBefore = idxAfter;
        //     }
        // }

        // // Point new node
        // // item.next => idx + 1
        // node.next = idxAfter;
        // // item.prev => idx - 1
        // node.prev = idxBefore;

        // // Break old linkes
        // // idx + 1 . prev => item
        // idxAfter.prev = node;
        // // idx - 1.next = item
        // idxBefore.next = node;
    }
    append(item: T): void {
        this.length++;
        // Create node

        const node = { value: item } as Node;

        // Attach to tail
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        // Tail to node
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value == item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        return this.removeNode(curr);

        // MY CODE
        // let curr = this.head;
        // for (let i = 0; curr && i < this.length; ++i) {
        //     if (curr && curr.value == item) break;
        //     curr = curr.next;
        // }

        // if (!curr) return;
        // this.length--;

        // if (curr.next) curr.next.prev = curr.prev;
        // if (curr.prev) curr.prev.next = curr.next;
        // if (this.length === 0) return (this.tail = this.head = undefined);
        // if (curr === this.head) this.head = curr.next;
        // if (curr === this.tail) this.tail = curr.prev;

        // curr.next = undefined;
        // curr.prev = undefined;
        // return curr.value;
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) return undefined;

        return this.removeNode(node);

        // MY CODE
        // const node = this.getAt(idx) as Node;
        // if (!node) return undefined;

        // this.length--;
        // if (node.prev) {
        //     node.prev.next = node.next;
        // }
        // if (node.next) {
        //     node.next.prev = node.prev;
        // }

        // if (node === this.head) this.head = node.next;
        // if (node === this.tail) this.tail = node.prev;

        // node.prev = node.next = undefined;
        // return node.value;
    }

    private getAt(idx: number): Node | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }

    private removeNode(node: Node): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
        return node.value;
    }
}
