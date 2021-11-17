// 泛型元祖
class Pair<T1, T2> {
    m0: T1;
    m1: T2;

    constructor(m0: T1, m1: T2) {
        this.m0 = m0;
        this.m1 = m1;
    }
}

type Point = Pair<number, number>

const point: Point = new Pair(10, 10)

console.log(point.m0);

// 维护不可变
class Currency {
    readonly dollars: number;
    readonly cents: number;

    constructor(dollars: number, cents: number) {
        if (!Number.isSafeInteger(cents) || cents < 0) throw new Error();

        dollars = dollars + (Math.floor(cents / 100));
        cents = cents % 100;

        if (!Number.isSafeInteger(dollars) || dollars < 0) throw new Error();

        this.dollars = dollars;
        this.cents = cents;
    }
}

const currency = new Currency(100, 250);
console.log(currency.dollars);
console.log(currency.cents);

