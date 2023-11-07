import Book from "../models/book";
import BooksProvider from "../providers/books_provider";

export default class BooksRepository {
    public static async getBooks(): Promise<Book[] | Response> {
        const response = await BooksProvider.getBooks();

        if (!response.ok) {
            return response;
        }

        const record = await response.json();

        let books: Book[] = []

        for (let i in record['books']) {
            books.push(Book.fromJSON(record['books'][i]))
        }

        return books;
    }
    
}