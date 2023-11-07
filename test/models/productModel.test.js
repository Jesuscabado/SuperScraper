import Product from "../../src/models/productModel.js";
import db from "../../src/config/db.js";
let id = null;
describe("Test de productModel", function() {// este describe es para agrupar los test

    test("Create product", async function() {// este test es para crear un producto
        const name = "AirFon";
        const description = "AirFon es un producto de prueba";
        const price = 1000;
        const product = await Product.create({name, description, price});
        expect(product).not.toBeNull();
        /* expect(product._id).not.toBeNull(); */
        expect(product.name).toEqual(name);
        expect(product.description).toEqual(description);
        expect(product.price).toEqual(price);
        id = product._id;
    });

    test("Get all products", async function() {
        const products = await Product.find();
        expect(products.length).toBeGreaterThan(0);
        id = products[products.length - 1]._id;
    });

    test("Get product by id", async function() {
        const product = await Product.findById({_id: id});
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe("AirFon");
        expect(product.description).toBe("AirFon es un producto de prueba");
        expect(product.price).toBe(1000);
    });

    test("Update product", async function() {
        const product = await Product.findById(id);
        product.name = "AirFon 2";
        product.description = "AirFon 2 es un producto de prueba";
        product.price = 3000;
        await product.save();
        const productNew = await Product.findById(id);
        expect(productNew).not.toBeNull();
        expect(productNew._id).toEqual(id);
        expect(productNew.name).toBe("AirFon 2");
        expect(productNew.description).toBe("AirFon 2 es un producto de prueba");
        expect(productNew.price).toBe(3000);
    });

    test("Delete product", async function() {
      await Product.deleteOne(id);
      const oldProduct = await Product.findOne(id);
      expect(oldProduct).toBeNull();
    });
        

}
);