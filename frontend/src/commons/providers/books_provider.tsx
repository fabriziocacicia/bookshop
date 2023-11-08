export default class BooksProvider {
    private static BACKEND_ENDPOINT: string = process.env.REACT_APP_BACKEND_ENDPOINT!;


    public static async getBooks(): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/books`);
    }

    public static async deleteBook(bookID: string): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/book/${bookID}`, {
            method: "DELETE",
        });
    }

    public static async addBook(bookJSON: any): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: bookJSON,
        });
    }
}