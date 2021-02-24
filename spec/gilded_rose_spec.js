const { Shop, Item } = require('../src/js/gilded_rose.js');
describe("GildedRose shop manager", function () {
  let listItems = [];

  beforeEach(function () {
    listItems = [];
  });

  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 2, 2));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 1, quality: 1 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualité reste à zéro", function () {
    listItems.push(new Item("+5 Dexterity Vest", 2, 0));
    listItems.push(new Item("Mana Cake", -1, 0));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: 1, quality: 0 },
      { sellIn: -2, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
  //   listItems.push(new Item("Aged Brie", 20, 30));
  //   listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

  //   const gildedRose = new Shop(listItems);
  //   const items = gildedRose.updateQuality();

  //   const expected = [
  //     { sellIn: 19, quality: 31 },
  //     { sellIn: 19, quality: 31 },
  //   ];
  //   expected.forEach(function (testCase, idx) {
  //     expect(items[idx].quality).toBe(testCase.quality);
  //     expect(items[idx].sellIn).toBe(testCase.sellIn);
  //   });
  // });

  // it("Sulfuras object légendaire", function () {
  //   listItems.push(new Sulfuras());

  //   const gildedRose = new Shop(listItems);
  //   const items = gildedRose.updateQuality();

  //   const expected = [
  //     { sellIn: Infinity, quality: 80 },
  //   ];
  //   expected.forEach(function (testCase, idx) {
  //     expect(items[idx].quality).toBe(testCase.quality);
  //     expect(items[idx].sellIn).toBe(testCase.sellIn);
  //   });
  // });
});