class LinkNode {
  value: number;
  next: LinkNode | undefined;

  constructor(value: number) {
    this.value = value;
    this.next = undefined;
  }
}

class LinkList {
  private tail: LinkNode = { value: 0, next: undefined };
  private head: LinkNode = this.tail;

  at(index: number): number {
    let result: LinkNode | undefined = this.head.next;

    while (index > 0 && result !== undefined) {
      result = result.next;
      index--;
    }

    if (result === undefined) throw new RangeError();

    return result.value;
  }

  append(value: number) {
    this.tail.next = { value, next: undefined };
    this.tail = this.tail.next;
  }
}

const linkList = new LinkList;
linkList.append(1);
linkList.append(2);
console.log(linkList.at(1));
