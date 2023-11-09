// Importa el modelo de producto desde el archivo 'productModel.js'
import Product from "../../src/models/productModel.js";
// Importa la configuración de la base de datos desde el archivo 'db.js'
import db from "../../src/config/db.js";
import mongoose from "mongoose";

// Declara una variable 'id' inicializada como nula, que se utilizará para almacenar el ID del producto creado

// Describe el conjunto de pruebas relacionadas con 'productModel'
describe("Test de productModel", function() {
    let id = null;
    const name = "AirFon";
    const description = "AirFon es un producto de prueba";
    const price = 1000;

    afterAll(async function() {
        await mongoose.disconnect();
    });
    // Prueba para crear un producto
    test("Create product", async function() {
        // Define valores para el nuevo producto
        
        // Crea un nuevo producto en la base de datos utilizando el modelo 'Product'
        const product = await Product.create({name, description, price});
        // Comprueba que el producto no sea nulo
        expect(product).not.toBeNull();
        // Comprueba que el nombre, descripción y precio del producto coincidan con los valores definidos
        expect(product.name).toEqual(name);
        expect(product.description).toEqual(description);
        expect(product.price).toEqual(price);
        // Almacena el ID del producto creado en la variable 'id'
        id = product._id;
    });

    // Prueba para obtener todos los productos
    test("Get all products", async function() {
        // Obtiene todos los productos de la base de datos
        const products = await Product.find();
        // Comprueba que haya al menos un producto en la base de datos
        expect(products.length).toBeGreaterThan(0);
        // Almacena el ID del último producto en la variable 'id'
        id = products[products.length - 1]._id;
    });

    // Prueba para obtener un producto por su ID
    test("Get product by id", async function() {
        // Obtiene un producto por su ID utilizando el valor almacenado en la variable 'id'
        const product = await Product.findById(id);
        // Comprueba que el producto no sea nulo
        expect(product).not.toBeNull();
        // Comprueba que el ID del producto coincida con el valor almacenado en 'id'
        expect(product._id).toEqual(id);
        // Comprueba que el nombre, descripción y precio del producto coincidan con los valores esperados
        expect(product.name).toBe("AirFon");
        expect(product.description).toBe("AirFon es un producto de prueba");
        expect(product.price).toBe(1000);
    });

    // Prueba para actualizar un producto
    test("Update product", async function() {
        // Obtiene un producto por su ID utilizando el valor almacenado en la variable 'id'
        const product = await Product.findById(id);
        // Actualiza las propiedades del producto
        product.name = "AirFon 2";
        product.description = "AirFon 2 es un producto de prueba";
        product.price = 3000;
        // Guarda los cambios en el producto en la base de datos
        await product.save();
        // Obtiene el producto actualizado por su ID
        const productNew = await Product.findById(id);
        // Comprueba que el producto actualizado no sea undefined
        expect(productNew).not.toBeUndefined();
        // Comprueba que el producto actualizado no sea nulo
        expect(productNew).not.toBeNull();
        // Comprueba que el ID del producto coincida con el valor almacenado en 'id'
        expect(productNew._id).toEqual(id);
        // Comprueba que el nombre, descripción y precio del producto se hayan actualizado correctamente
        expect(productNew.name).toBe("AirFon 2");
        expect(productNew.description).toBe("AirFon 2 es un producto de prueba");
        expect(productNew.price).toBe(3000);
    });

    // Prueba para eliminar un producto
    test("Delete product", async function() {
        // Elimina un producto por su ID utilizando el valor almacenado en la variable 'id'
        await Product.deleteOne(id);
        // Intenta encontrar el producto eliminado por su ID
        const oldProduct = await Product.findOne(id);
        // Comprueba que el producto eliminado ya no exista en la base de datos
        expect(oldProduct).toBeNull();
    });

});
