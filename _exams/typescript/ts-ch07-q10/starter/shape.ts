export abstract class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract area(): number;

  describe(): string {
    // TODO：回傳「<名稱>的面積是 <面積取到小數點後一位>」
    throw new Error("TODO");
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super("圓形");
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

// TODO：寫出 Rectangle，名稱是「長方形」，建構子收 width 和 height
export class Rectangle extends Shape {
  constructor(width: number, height: number) {
    super("長方形");
  }

  area(): number {
    throw new Error("TODO");
  }
}
