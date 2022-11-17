export class Product {
  id: number;
  name: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  constructor(id: number, name: string, description: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
