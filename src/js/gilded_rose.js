class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn; 
    this.quality = quality;
    if (this.quality >50) {this.quality = 50};
    if (this.quality <0) {this.quality = 0};
  }
  updateQuality() {
    this.sellIn -= 1;
    if(this.sellIn>=0) {
      this.quality -= 1;
    } else {
      this.quality -= 2;
    }
    this.limitQuality();
    return this;
  }

  limitQuality() {
    if (this.quality <0) {this.quality = 0};
    if (this.quality>50) {this.quality=50};
  }
}

class Sulfuras extends Item {
  constructor(name, sellIn, quality){
    super (name, sellIn, quality)
      this.name = 'Sulfuras, Hand of Ragnaros';
      this.sellIn = Infinity;
      this.quality = 80;
  }
  updateQuality() {
    return this;
  }
}

class AgedBrie extends Item {
  constructor(name, sellIn, quality){
    super (name)
    this.name = 'Aged Brie';
  }
  updateQuality() {
    this.sellIn -= 1;
    this.quality += 1;
    this.limitQuality();
    return this;
  }
}

class BackstagedPasses extends Item {
 constructor(name, sellIn, quality){
  super (name)
    this.name = 'Backstage passes to a TAFKAL80ETC concert';
  }
}

class Conjured extends Item {
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }

}


module.exports = {
  Item,
  Sulfuras,
  AgedBrie,
  BackstagedPasses,
  Conjured,
  Shop
}
