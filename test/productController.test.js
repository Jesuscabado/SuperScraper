import productController from "../src/controllers/productController.js";
import Product from "../src/models/productModel.js";
import db from "../src/config/db.js";

let productId = null;
describe("Test de productController", function() {

    let productId = 0;

    beforeAll( function() {

        return new Promise( async function(resolve) {
        // delete all products and create one
        if(await Product.find()) {
            const name = "Sagarra";
            const description = "Manzana";
            const price = 100;
            const product = await Product.create({name, description, price});
            productId = product._id;
        }
        resolve();
        });
    });
    test("Get all products", async function() {
        const products = await productController.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products.find(p => p._id === productId)).not.toBeNull();
    });

    test("Get product by id", async function() {
        const id = productId;
        const product = await productController.getProductById(id);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe("Sagarra");
        expect(product.description).toBe("Manzana");
        expect(product.price).toBe(100);
    });

    test("Create product", async function() {
        const name = "TestCreate";
        const description = "TestCreate";
        const price = 100;
        const product = await productController.createProduct(name, description, price);
        productId = product._id;
        expect(product).not.toBeNull();
        expect(product._id).not.toBeNull();
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    test("Update product", async function() {
        const id = productId;
        const name = "TestUpdate";
        const description = "TestUpdate";
        const price = 200;
        const product = await productController.updateProduct(id, name, description, price);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    test("Delete product", async function() {
        const id = productId;
        await productController.deleteProduct(id);
        const product = await productController.getProductById(id);
        expect(product).toBeNull();
    });
}
);
