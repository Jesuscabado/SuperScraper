import Product from '../models/productModel.js';

const getAllProducts =  () => {
    return  Product.find();
}

const getProductById = (id) => {
    return Product.findById(id);
}

const createProduct = async(name, description, price) => {
    const newProduct = {
        name,
        description,
        price
    };
    const product =new Product(newProduct);
    return product.save();

}

const updateProduct = async (id, name, description, price) => {
    const product = await getProductById(id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.save();
    return product;
}

const deleteProduct = async(id) => {
    const product = await getProductById(id);
    await Product.deleteOne({_id: id});
    return product;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
