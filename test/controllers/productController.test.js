// Importaciones de módulos y archivos necesarios
import productController from "../../src/controllers/productController.js";
import Product from "../../src/models/productModel.js";
import db from "../../src/config/db.js";

// Variable global para almacenar el id del producto
let productId = null;

// Descripción del conjunto de pruebas
describe("Test de productController", function() {

    // Configuración antes de todas las pruebas
    beforeAll( function() {

        // Retorna una promesa para manejar operaciones asíncronas
        return new Promise( async function(resolve) {
            // Elimina todos los productos existentes y crea uno nuevo si no hay productos
            if(await Product.find()) {
                const name = "Sagarra";
                const description = "Manzana";
                const price = 100;
                const product = await Product.create({name, description, price});
                productId = product._id;
            }
            // Resuelve la promesa para indicar que la configuración ha terminado
            resolve();
        });
    });

    // Prueba: Obtener todos los productos
    test("Get all products", async function() {
        // Obtiene la lista de productos a través del controlador
        const products = await productController.getAllProducts();
        // Verifica que haya al menos un producto en la lista
        expect(products.length).toBeGreaterThan(0);
        // Verifica que el producto con el id almacenado exista en la lista de productos
        expect(products.find(p => p._id === productId)).not.toBeNull();
    });

    // Prueba: Obtener producto por id
    test("Get product by id", async function() {
        // Id del producto a ser buscado
        const id = productId;
        // Obtiene un producto por su id a través del controlador
        const product = await productController.getProductById(id);
        // Verifica que el producto no sea nulo y contenga la información correcta
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe("Sagarra");
        expect(product.description).toBe("Manzana");
        expect(product.price).toBe(100);
    });

    // Prueba: Crear producto
    test("Create product", async function() {
        // Información del nuevo producto
        const name = "TestCreate";
        const description = "TestCreate";
        const price = 100;
        // Crea un nuevo producto a través del controlador
        const product = await productController.createProduct(name, description, price);
        // Actualiza el id del producto con el nuevo id generado
        productId = product._id;
        // Verifica que el producto creado no sea nulo y contenga la información correcta
        expect(product).not.toBeNull();
        expect(product._id).not.toBeNull();
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    // Prueba: Actualizar producto
    test("Update product", async function() {
        // Id del producto a ser actualizado
        const id = productId;
        // Nueva información del producto
        const name = "TestUpdate";
        const description = "TestUpdate";
        const price = 200;
        // Actualiza un producto a través del controlador
        const product = await productController.updateProduct(id, name, description, price);
        // Verifica que el producto actualizado contenga la información correcta
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.name).toBe(name);
        expect(product.description).toBe(description);
        expect(product.price).toBe(price);
    });

    // Prueba: Eliminar producto
    test("Delete product", async function() {
        // Id del producto a ser eliminado
        const id = productId;
        // Elimina un producto a través del controlador
        await productController.deleteProduct(id);
        // Verifica que el producto ya no exista después de la eliminación
        const product = await productController.getProductById(id);
        expect(product).toBeNull();
    });

    // Operación después de todas las pruebas: Elimina todos los productos
    /* afterAll( async function() {
        await Product.deleteMany();
    }); */

});
