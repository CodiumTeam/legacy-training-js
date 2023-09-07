import {GildedRose, Item} from '../src/gilded_rose';
import * as fs from "fs";

describe('Gilded Rose', function () {
    it("should return correct result", () => {
        const storeItems = [
            new Item("+5 Dexterity Vest", 10, 20),
            new Item("Aged Brie", 2, 0),
            new Item("Elixir of the Mongoose", 5, 7),
            new Item("Sulfuras, Hand of Ragnaros", 0, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
        ];
        const gildedRose = new GildedRose(storeItems);

        let result = ''
        for (let day = 0; day < 20; day++) {
            result += `--------- day ${day}\n`;
            result += "name, sell_in, quality\n";
            for (const item of storeItems) {
                result += JSON.stringify(item) + "\n";
            }
            gildedRose.updateQuality();
        }
        //fs.writeFileSync('golden_master.txt', result);

        let expectedResult = fs.readFileSync('golden_master.txt','utf-8');
        expect(result).toStrictEqual(expectedResult);
    });
});
