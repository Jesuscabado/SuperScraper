import Parser from '../../src/utils/parser.js';
import fs from 'fs';
describe('Test de parser de eroski',()=>{
    let parser = null;
    beforeAll(()=>{
        const html = fs.readFileSync('test/parser/index.html', 'utf8');
        parser = new Parser(html);
    })
    test("Conseguir la seccion general de productos", ()=>{
        const result = parser.getListSection();
        expect(result.innerHTML).toContain("Fiambres y cocidos</h1>");
    })
    test("Conseguir la lista de productos", ()=>{
        const section = parser.getListSection();
        const ItemList = parser.getItems(section);
        expect(ItemList.length).toEqual(20);
    })
})