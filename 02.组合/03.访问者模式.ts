// // 定义每个访问者对应的处理方法
// interface IVisitor {
//   visitParagraph(paragraph: Paragraph): void;
//   visitPicture(paragraph: Picture): void;
//   visitTable(paragraph: Table): void;
// }

// // Renderer 和 ScreenRender 实现接口
// class Renderer implements IVisitor {
//   visitParagraph(paragraph: Paragraph) { }
//   visitPicture(paragraph: Picture) { }
//   visitTable(paragraph: Table) { }
// }

// class ScreenRender implements IVisitor {
//   visitParagraph(paragraph: Paragraph) { }
//   visitPicture(paragraph: Picture) { }
//   visitTable(paragraph: Table) { }
// }

// // 接收访问者
// interface IDocumentItem {
//   accept(visitor: IVisitor): void;
// }

// // 调用需要的方法，将自己违参数传入
// class Paragraph implements IDocumentItem {
//   accept(visitor: IVisitor) {
//     visitor.visitParagraph(this);
//   }
// }

// class Picture implements IDocumentItem {
//   accept(visitor: IVisitor) {
//     visitor.visitPicture(this);
//   }
// }

// class Table implements IDocumentItem {
//   accept(visitor: IVisitor) {
//     visitor.visitTable(this);
//   }
// }

// const doc: IDocumentItem[] = [new Paragraph(), new Table()];
// const render: IVisitor = new Renderer();

// for (const item of doc) {
//   item.accept(render);
// }

// _________________________________________________________________________

// 变体实现

import {Variant} from './02.多选一'

class Renderer {
    visitParagraph(paragraph: Paragraph) {
    }

    visitPicture(paragraph: Picture) {
    }

    visitTable(paragraph: Table) {
    }
}

class ScreenRender {
    visitParagraph(paragraph: Paragraph) {
    }

    visitPicture(paragraph: Picture) {
    }

    visitTable(paragraph: Table) {
    }
}

class Paragraph {
}

class Picture {
}

class Table {
}

function visit<T1, T2, T3, U1, U2, U3>(
    variant: Variant<T1, T2, T3>,
    func1: (value: T1) => U1,
    func2: (value: T2) => U2,
    func3: (value: T3) => U3,
): Variant<U1, U2, U3> {
    switch (variant.index) {
        case 0:
            return Variant.make1(func1(<T1>variant.value));
        case 1:
            return Variant.make2(func2(<T2>variant.value));
        case 2:
            return Variant.make3(func3(<T3>variant.value));
        default:
            throw new Error();
    }
}

const doc: Variant<Paragraph, Picture, Table>[] = [
    Variant.make1(new Paragraph()),
    Variant.make3(new Table()),
]

const renderer: Renderer = new Renderer();

for (const item of doc) {
    visit(
        item,
        (paragraph: Paragraph) => renderer.visitParagraph(paragraph),
        (picture: Picture) => renderer.visitPicture(picture),
        (table: Table) => renderer.visitTable(table),
    )
}
