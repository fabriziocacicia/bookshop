export default class Book  {
    public id?: string;
    public title: string;
    public author: string;
    public year: number;
    public price: number;

    constructor({id, title, author, year, price}: {id?: string, title: string, author: string, year: number, price: number}) {
        this.id = id;
        this.title = title;
        this.author = author
        this.year = year
        this.price = price
    }

    static fromJSON(json: any): Book {
        return new Book({id: json['_id'], title: json['title'], author: json['author'], year: json['year'], price: json['price']});
    }

    toJson(): any {
        const jsonObject = {
            id: this.id,
            title: this.title,
            author: this.author,
            year: this.year,
            price: this.price
        }

        return JSON.stringify(jsonObject)
    }
}