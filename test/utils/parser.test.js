import Parser from "../../src/utils/parser.js" 
import fs from "fs";
describe("Tests del parser de eroski",()=>{
    let parser  = null;
    beforeAll(()=>{
        const html = fs.readFileSync("test/utils/index.html");
        parser = new Parser(html);
    })
    test("Conseguir la seccion general de poductos",()=>{
        const result  = parser.getListSection();
        expect(result.innerHTML).toContain("Fiambres y cocidos</h1>");
    })

    test("Conseguir el array de productos",()=>{
        const section = parser.getListSection();
        const itemList = parser.getItems(section);
        expect(itemList.length).toEqual(20); 
    })
    test("Conseguir el titulo de un producto",()=>{
        const section = parser.getListSection();
        const itemList = parser.getItems(section);
        const title = parser.getTitle(itemList[0]);
        expect(title).toEqual("Jamón cocido artesano URKABE, sobre 200 g");
    })

    test("Conseguir el precio de un producto",()=>{
        const section = parser.getListSection();
        const itemList = parser.getItems(section);
        const price = parser.getPrice(itemList[0]);
        expect(price).toEqual(3.45);
    })

    test("Conseguir la imagen de un producto",()=>{
        const section = parser.getListSection();
        const itemList = parser.getItems(section);
        const image = parser.getImage(itemList[0]);
        expect(image).toEqual("https://supermercado.eroski.es/images/6343933.jpg");
    });

    test("Conseguir un array de productos",()=>{
        const products = parser.getProducts();
        expect(products.length).toEqual(20);
        expect(products[0].nombre).toEqual("Jamón cocido artesano URKABE, sobre 200 g");
        expect(products[0].precio).toEqual(3.45);
        expect(products[0].imagen).toEqual("https://supermercado.eroski.es/images/6343933.jpg");
    })
})