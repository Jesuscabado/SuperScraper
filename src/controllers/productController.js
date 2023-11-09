// Importar el modelo de producto desde el archivo 'productModel.js'
import Product from '../models/productModel.js';

// Función para obtener todos los productos
const getAllProducts =  () => {
    // Utiliza el método 'find()' de Mongoose para buscar y recuperar todos los productos
    return  Product.find();
}

// Función para obtener un producto por su ID
const getProductById = (id) => {
    // Utiliza el método 'findById()' de Mongoose para buscar un producto por su ID
    return Product.findById(id);
}

// Función para crear un nuevo producto
const createProduct = async(name, description, price) => {
    // Crea un objeto 'newProduct' con los datos proporcionados
    const newProduct = {
        name,
        description,
        price
    };
    // Utiliza el modelo 'Product' para crear un nuevo documento de producto y lo guarda en la base de datos
    const product = new Product(newProduct);
    await product.save();
    // Devuelve el producto recién creado
    return product;
}

// Función para actualizar un producto existente
const updateProduct = async (id, name, description, price) => {
    // Obtiene el producto existente por su ID utilizando 'getProductById'
    const product = await getProductById(id);
    // Actualiza las propiedades del producto con los nuevos valores
    product.name = name;
    product.description = description;
    product.price = price;
    // Guarda los cambios en el producto en la base de datos
    await product.save();
    // Devuelve el producto actualizado
    return product;
}

// Función para eliminar un producto por su ID
const deleteProduct = async(id) => {
    // Obtiene el producto por su ID utilizando 'getProductById'
    const product = await getProductById(id);
    // Elimina el documento correspondiente en la base de datos
    await Product.deleteOne({_id: id});
    // Devuelve el producto eliminado
    return product;
}

// Exporta las funciones para su uso en otros módulos
export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
