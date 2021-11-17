// 变体类型：
// 1. 也称为标签联合类型，包含任意数量的基本类型的值。
// 2. 标签指的是即使基本类型有重合的值，我们仍然能够准确说明该值来自哪个类型。

// Either类型
// 包含两个类型，TLeft和TRight。约定为TLeft存储错误类 型，TRight存储有效值类型。
class Either<TLeft, TRight> {
    readonly value: TLeft | TRight;
    readonly left: boolean;

    // 私有构造函数，数据在内部处理，防止外部改变导致值和布尔状态不同步
    private constructor(value: TLeft | TRight, left: boolean) {
        this.value = value;
        this.left = left;
    }

    isLeft(): boolean {
        return this.left;
    }

    getLeft(): TLeft {
        if (!this.isLeft()) throw new Error;
        return <TLeft>this.value;
    }

    isRight(): boolean {
        return !this.left;
    }

    getRight(): TRight {
        if (!this.isRight()) throw new Error;
        return <TRight>this.value;
    }

    static makeLeft<TLeft, TRight>(value: TLeft) {
        return new Either<TLeft, TRight>(value, true)
    }

    static makeRight<TLeft, TRight>(value: TRight) {
        return new Either<TLeft, TRight>(value, false)
    }
}

enum InputError {
    NoInput,
    invalid
}

enum Success {
    OK = 200,
}

type Result = Either<InputError, Success>

function testError(): Result {
    return Either.makeLeft(InputError.NoInput)
}

console.log(testError().getLeft());

function testRight(): Result {
    return Either.makeRight(Success.OK)
}

console.log(testRight().getRight());

// __________________________________________________________________________________

// 标签类
export class Variant<T1, T2, T3> {
    readonly value: T1 | T2 | T3;
    readonly index: number

    constructor(value: T1 | T2 | T3, index: number) {
        this.value = value;
        this.index = index;
    }

    static make1<T1, T2, T3>(value: T1): Variant<T1, T2, T3> {
        return new Variant<T1, T2, T3>(value, 0);
    }

    static make2<T1, T2, T3>(value: T2): Variant<T1, T2, T3> {
        return new Variant<T1, T2, T3>(value, 1);
    }

    static make3<T1, T2, T3>(value: T3): Variant<T1, T2, T3> {
        return new Variant<T1, T2, T3>(value, 2);
    }
}

// 形状类
class Point {
    x: number = 0;
    y: number = 0;
}

class Circle {
    x: number = 0;
    y: number = 0;
    radius: number = 0;
}

class Rectangle {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0
}

// 形状列表
type shape = Variant<Point, Circle, Rectangle>

const shapes: shape[] = [
    Variant.make2(new Circle()),
    Variant.make3(new Rectangle()),
];

for (const shape of shapes) {
    switch (shape.index) {
        case 0:
            const point: Point = <Point>shape.value;
            console.log(`Point ${JSON.stringify(point)}`)
            break;
        case 1:
            const circle: Circle = <Circle>shape.value;
            console.log(`Point ${JSON.stringify(circle)}`)
            break;
        case 2:
            const rectangle: Rectangle = <Rectangle>shape.value;
            console.log(`Point ${JSON.stringify(rectangle)}`)
            break;
        default:
            throw new Error()
    }
}