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

    removeItemById(itemId: number) {
        this.basketItems = this.basketItems.filter(item => item.id === itemId);
        return this.basketItems;
    }

    getItemById(itemId: number) {
        return this.basketItems.find(item => item.id === itemId);
    }

    incItemQuantity(itemId: number, amount: number) {
        const item = this.basketItems.find(item => item.id === itemId);
        item.incQuantity(amount);
    }

    decItemQuantity(itemId: number, amount: number) {
        const item = this.basketItems.find(item => item.id === itemId);
        item.decQuantity(amount);
    }
}
