const { Item, Sulfuras, AgedBrie, BackstagedPasses } = require('../src/js/gilded_rose.js');
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

  it("Qualité reste à zéro, peu importe la valeur de sellIn", function () {
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

  it("Quand Sellin < 0 , la qualité diminue par 2", function () {
    listItems.push(new Item("+5 Dexterity Vest", -1, 4));
    listItems.push(new Item("Mana Cake", -2, 6));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: -2, quality: 2},
      { sellIn: -3, quality: 4}
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Quand on instancie un item, sa qualité maximum est de 50", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 70));
    listItems.push(new Item("Mana Cake", 2, 51));

    const expected = [
      { sellIn: 10, quality: 50},
      { sellIn: 2, quality: 50}
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Sulfuras object légendaire", function () {
    listItems.push(new Sulfuras());

    listItems[0].updateQuality();

    const expected = [
      { sellIn: Infinity, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie, avec un plafont à 50", function () {
    listItems.push(new AgedBrie("Aged Brie", 5, 20));
    listItems.push(new AgedBrie("Aged Brie", 10, 50));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: 4, quality: 21 },
      { sellIn: 9, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 1 à plus de 10 jours, de 2 entre 5 et 10, de 3 entre 0 et 5, avec un plafont à 50, et faire tomber la qualité à 0 après le concert", function () {
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 20, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 9, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 4, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", -1, 30));
    listItems.push(new BackstagedPasses("Backstage passes to a TAFKAL80ETC concert", 9, 50));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 8, quality: 32 },
      { sellIn: 3, quality: 33 },
      { sellIn: -2, quality: 0 },
      { sellIn: 8, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Les Items Conjured se dégradent deux fois plus vite", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Conjured Mana Cake", -1, 6));

    listItems.forEach(item=>item.updateQuality());

    const expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: -2, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(listItems[idx].quality).toBe(testCase.quality);
      expect(listItems[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});