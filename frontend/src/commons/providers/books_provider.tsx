export default class BooksProvider {
    private static BACKEND_ENDPOINT: string = 'http://localhost:5123'


    public static async getBooks(): Promise<Response> {
        return fetch(`${BooksProvider.BACKEND_ENDPOINT}/books`);
    }
}