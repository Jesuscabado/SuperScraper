import Scraper from "../../src/utils/scraper.js";
import Parser from "../../src/utils/parser.js";
describe("Tests del scraper de eroski",()=>{
    let scraper = null;
    beforeAll(async ()=>{
        scraper =new Scraper();
        await scraper.promise;
    })
    afterAll(async ()=>{
        await scraper.browser.close();
    });
    test("Conseguir el html de una url",async ()=>{
        const url = "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059872-fiambres-y-cocidos/"
        const html = await scraper.getHtml(url);
        expect(html).toContain("<title>Fiambres y cocidos</title>");
    });
    // test dudoso, no debería testearse en el scraper, sino en un controlador que una el scraper con el parser
    test("Conseguir 20 productos de una url",async ()=>{
        const url = "https://supermercado.eroski.es/es/supermercado/2059698-frescos/2059872-fiambres-y-cocidos/"
        const html = await scraper.getHtml(url);
        const parser = new Parser(html);
        const products = parser.getProducts();
        expect(products.length).toEqual(20);
    });
});