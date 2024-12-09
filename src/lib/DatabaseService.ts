export class DatabaseService {

    public static readonly Instance = new DatabaseService();


    public  getAllProducts(): Product[] {
        const products = db.prepare("SELECT * FROM product").get();
        return products;
    }
}