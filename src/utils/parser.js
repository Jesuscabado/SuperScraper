// Importa la clase JSDOM desde la biblioteca 'jsdom'.
import { JSDOM } from 'jsdom';

// Define la clase Parser.
class Parser {
    // El constructor recibe un parámetro 'html' que representa el código HTML a analizar.
    constructor(html) {
        // Almacena el HTML proporcionado en la instancia de la clase.
        this.html = html;
        // Crea una instancia de JSDOM y le pasa el HTML para construir el DOM virtual.
        this.dom = new JSDOM(html);
    }

    // Obtiene la sección que contiene la lista de productos.
    getListSection() {
        // Utiliza el método querySelector para seleccionar el elemento con la clase 'product-lineal-content'.
        const result = this.dom.window.document.querySelector('.product-lineal-content');
        // Devuelve el resultado.
        return result;
    }

    // Obtiene los elementos individuales de la lista de productos.
    getItems(section) {
        // Utiliza querySelectorAll para seleccionar todos los elementos con la clase 'product-item' dentro de la sección dada.
        const results = section.querySelectorAll('.product-item');
        // Convierte el NodeList a un array utilizando Array.from.
        const resultsArray = Array.from(results);
        // Devuelve el array de elementos.
        return resultsArray;
    }

    // Obtiene el título de un producto.
    getTitle(item) {
        // Utiliza querySelector para seleccionar el elemento con la clase 'product-title' dentro del producto dado.
        const result = item.querySelector(".product-title");
        // Devuelve el contenido de texto del elemento, eliminando espacios en blanco al principio y al final.
        return result.textContent.trim();
    }

    // Obtiene el precio de un producto.
    getPrice(item) {
        // Utiliza querySelector para seleccionar el elemento con la clase 'price-offer-now' dentro del producto dado.
        const result = item.querySelector(".price-offer-now");
        // Obtiene el contenido de texto y elimina espacios en blanco al principio y al final.
        const price = result.textContent.trim();
        // Convierte el precio a un número, reemplazando las comas por puntos si es necesario.
        const priceNumber = parseFloat(price.replace(",", "."));
        // Devuelve el precio como número.
        return priceNumber;
    }

    // Obtiene la URL de la imagen de un producto.
    getImage(item) {
        // Utiliza querySelector para seleccionar el elemento img dentro del elemento con la clase 'product-image'.
        const result = item.querySelector(".product-image img");
        // Devuelve la fuente (src) de la imagen.
        return result.src;
    }

    // Obtiene la lista de productos con sus respectivos detalles.
    getProducts() {
        // Obtiene la sección que contiene la lista de productos.
        const section = this.getListSection();
        // Obtiene los elementos individuales de la lista de productos.
        const items = this.getItems(section);
        // Mapea los elementos a un array de objetos que contienen el nombre, precio e imagen de cada producto.
        const products = items.map(item => {
            const nombre = this.getTitle(item);
            const precio = this.getPrice(item);
            const imagen = this.getImage(item);
            // Devuelve un objeto con los detalles del producto.
            return { nombre, precio, imagen };
        });
        // Devuelve el array de productos.
        return products;
    }
}

// Exporta la clase Parser para que pueda ser utilizada en otros archivos.
export default Parser;
