import { GuitarStringsCount } from "src/core/types/product/guitar-strings-count";
import { GuitarType } from "src/core/types/product/guitar-type";
import { getImages } from "src/helpers/mocks/images";
import { getArticles, getDescriptions, getTitles } from "src/helpers/mocks/product";

enum Price {
  Min = 100,
  Max = 100000
}

export class ProductGenerator {

  private generateRandomValue(min: number, max: number, numAfterDigit = 0) {
    return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
  }

  private getRandomItem<T>(items: T[]): T {
    return items[this.generateRandomValue(0, items.length - 1)];
  }

  private generateRandomDate(): Date {
    const startTime = new Date(2024, 0, 1).getTime();
    const endTime = new Date().getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }

  public generate() {
    return {
      title: this.getRandomItem<string>(getTitles()),
      article: this.getRandomItem<string>(getArticles()),
      createdAt: this.generateRandomDate(),
      description: this.getRandomItem<string>(getDescriptions()),
      photoPath: this.getRandomItem<string>(getImages()),
      price: this.generateRandomValue(Price.Min, Price.Max),
      stringsCount: this.getRandomItem<number>(Object.values(GuitarStringsCount)),
      type: this.getRandomItem<string>(Object.values(GuitarType)),
    };
  }
}
