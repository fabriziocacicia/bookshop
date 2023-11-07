import { Data } from "dataclass";

export default class Book extends Data {
    id: string = "";
    title: string = "";
    author: string = "";
    year: number = 0;
    price: number = 0

    /* constructor(id: string, title: string, author: string, year: number, price: number) {
        super()
        
        this.id = id;
        this.title = title;
        this.author = author
        this.year = year
        this.price = price
    } */

    static fromJSON(json: any): Book {
        return Book.create({id: json['_id'], title: json['title'], author: json['author'], year: json['year'], price: json['price']});
    }
}