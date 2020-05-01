export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  constructor(id, name, description = '', price = 0, imageUrl = 'https://www.dhresource.com/0x0/f2/albu/g10/M00/86/3B/rBVaVl3kZ0uAXXEjAAHd8Rkn774074.jpg') {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }
}
