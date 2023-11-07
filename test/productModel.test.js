import Product from "../src/models/productModel.js";
import db from "../src/config/db.js";
let id = null;
describe("Test de productModel", function() {

    test("Create product", async function() {
        const name = "TestCreate";
        const description = "TestCreate";
        const price = 100;
        const product = await Product.create({name, description, price});
        expect(product).not.toBeNull();
        expect(product._id).not.toBeNull();
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    test("Get all products", async function() {
        const products = await Product.find();
        expect(products.length).toBeGreaterThan(0);
        id = products[products.length - 1]._id;
    });

    test("Get product by id", async function() {
        const product = await Product.findById(id);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe("TestCreate");
        expect(product.description).toBe("TestCreate");
        expect(product.price).toBe(100);
    });
}
);