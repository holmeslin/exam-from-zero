export abstract class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract area(): number;

  describe(): string {
    return `${this.name}的面積是 ${this.area().toFixed(1)}`;
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

export class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super("長方形");
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}
