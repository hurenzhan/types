declare const EmptyType: unique symbol;

// 法被实例化的类
class Empyt { // never
  [EmptyType]: void;  // 确保具有相同形状的其他对象不会被解释为这个类型的一种方式
  private constructor() { } // 私有构造函数确保不能被实例化
}

function raise(message: string): Empyt {  // 不能创建 Empty 的实例，所以根本不能添加 return 语句。
  throw new Error(message)
}

// raise('test error')

declare const UnitType: unique symbol;

// 将单元类型实现为一个无状态的单例
class Unit {
  [UnitType]: void;
  static readonly value: Unit = new Unit  // 静态只读唯一能创建的实例
  private constructor() { }
}

function greet(): Unit {  // 不能创建 Empty 的实例，所以根本不能添加 return 语句。 void
  console.log('hello');
  return Unit.value;
}

// greet()
