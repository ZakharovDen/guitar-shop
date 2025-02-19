import { GuitarStringsCount } from "src/core/types/product/guitar-strings-count";
import { GuitarType } from "src/core/types/product/guitar-type";

export const ProductFieldDescription = {
  Id: { description: 'Уникальный идентификатор', example: '05020c43-36c4-413a-8e0f-f3cf60fe8bbe' },
  Title: { description: 'Наименование', example: 'СURT Z30 Plus' },
  Description: {
    description: 'Описание товара',
    example: `Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений.
 Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.`
  },
  CreatedAt: { description: 'Дата добавления товара', example: new Date() },
  PhotoPath: { description: 'Фотография товара', example: '/static/1.jpg' },
  Type: { description: 'Тип гитары', example: GuitarType.Acoustic },
  Article: { description: 'Артикул', example: 'SO754565' },
  StringsCount: { description: 'Количество струн', example: GuitarStringsCount.Four },
  Price: { description: 'Цена', example: 100500 },
} as const;

export const ProductValidateValue = {
  Title: {
    MinLength: 10,
    MaxLength: 100,
  },
  Description: {
    MinLength: 20,
    MaxLength: 1024,
  },
  Article: {
    MinLength: 5,
    MaxLength: 40,
  },
  Price: {
    Min: 100,
    Max: 1000000,
  },
} as const;

export const ProductValidateMessage = {
  Title: `Min length for Title is ${ProductValidateValue.Title.MinLength}, max is ${ProductValidateValue.Title.MaxLength}`,
  Description: `Min length for Description is ${ProductValidateValue.Description.MinLength}, max is ${ProductValidateValue.Description.MaxLength}`,
  Article: `Min length for Article is ${ProductValidateValue.Article.MinLength}, max is ${ProductValidateValue.Article.MaxLength}`,
} as const;

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortField {
  CreateDate = 'Дата добавления',
  Price = 'Цена',
};

export const DEFAULT_ITEM_COUNT_LIMIT = 7;
export const DEFAULT_SORT_DIRECTION = SortDirection.Asc;
export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_SORT_FIELD = SortField.CreateDate;