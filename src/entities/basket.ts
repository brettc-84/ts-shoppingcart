import { BasketItem } from "./basket-item";

export class Basket {
    id: number;
    basketItems: BasketItem[];

    constructor() {
        this.basketItems = [];
    }

    getItems(): BasketItem[] {
        return this.basketItems;
    }

    addItem(item: BasketItem) {
        const existing = this.basketItems.find(bItem => bItem.sku === item.sku);
        if (!existing) {
            this.basketItems.push(item);
        } else {
            existing.incQuantity();
        }
    }
}
