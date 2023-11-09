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

    public static async getBook(bookID: string): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/book/${bookID}`, {
            method: "GET",
        })
    }

    public static async editBook(bookID: string, bookJSON: any): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/book/${bookID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: bookJSON,
        })
    }

    public static async aiSearch(searchQuery: string): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/aisearch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "query": searchQuery
            }),
        });
    }
}