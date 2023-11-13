// Importa la biblioteca Puppeteer que se utiliza para realizar scraping mediante navegadores web automatizados.
import puppeteer from 'puppeteer';

// Define la clase Scraper.
export default class Scraper {
    // El constructor inicializa algunas variables y llama al método init para configurar Puppeteer.
    constructor() {
        // Indica si el scraper está listo para ser utilizado.
        this.isReady = false;
        // Almacena la instancia del navegador Puppeteer.
        this.browser = null;
        // Inicia la configuración del scraper.
        this.promise = this.init();
    }

    // Inicializa Puppeteer y configura el navegador.
    async init() {
        // Inicia el navegador Puppeteer de forma asíncrona.
        this.browser = await puppeteer.launch({
            product: 'firefox',
            // Indica que el navegador no se ejecutará en modo headless (sin interfaz gráfica).
            headless: false,
        });
        // Indica que el scraper está listo para ser utilizado.
        this.isReady = true;
    }

    // Obtiene el código HTML de una URL dada.
    async getHtml(url) {
        // Espera a que el scraper esté listo para ser utilizado.
        await this.promise;
        // Abre una nueva página en el navegador.
        const page = await this.browser.newPage();
        // Navega a la URL proporcionada.
        await page.goto(url);
        // Obtiene el contenido HTML de la página.
        const html = await page.content();
        // Guarda el contenido HTML en un archivo.
        const showHtml = html.saveToFile("html.txt");
        // Cierra la página para liberar recursos.
        await page.close();
        // Devuelve el código HTML obtenido.
        return html;
    }
}

// Exporta la clase Scraper para que pueda ser utilizada en otros archivos.
