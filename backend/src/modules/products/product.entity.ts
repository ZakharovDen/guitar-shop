import { Entity } from "src/core/base/entity";
import { StorableEntity } from "src/core/interfaces/storable-entity.interface";
import { Product } from "src/core/types/product/product.interface";

export class ProductEntity extends Entity implements StorableEntity<Product> {
  public title: string;
  public description: string;
  public createdAt: Date;
  public photoPath: string;
  public type: string;
  public article: string;
  public stringsCount: number;
  public price: number;

  constructor(product?: Product) {
    super();
    this.populate(product);
  }

  populate(product?: Product): void {
    if (!product) {
      return;
    }

    this.id = product.id ?? undefined;
    this.title = product.title;
    this.description = product.description;
    this.createdAt = product.createdAt;
    this.photoPath = product.photoPath;
    this.type = product.type;
    this.article = product.article;
    this.stringsCount = product.stringsCount;
    this.price = product.price;
  }

  toPOJO(): Product {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      photoPath: this.photoPath,
      type: this.type,
      article: this.article,
      stringsCount: this.stringsCount,
      price: this.price
    };
  }
}
