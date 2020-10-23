import { BasketItem } from "./basket-item";

export class Basket {
    id: number;
    basketItems: BasketItem[];

    constructor(id?: number) {
        if (id) {
            this.id = id;
        }
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
        this.basketItems = this.basketItems.filter(item => item.id !== itemId);
        return this.basketItems;
    }

    getItemById(itemId: number) {
        return this.basketItems.find(item => item.id === itemId);
    }

    incItemQuantity(itemId: number, amount: number) {
        const it = this.basketItems.find(item => item.id === itemId);
        if (!it) {
            throw new Error('Item does not exist in basket');
        }
        it.incQuantity(amount);
    }

    decItemQuantity(itemId: number, amount: number) {
        const it = this.basketItems.find(item => item.id === itemId);
        if (!it) {
            throw new Error('Item does not exist in basket');
        }
        if (it.getQuantity()-amount < 0) {
            throw new Error('Cannot decrease quantity to negative value');
        }
        it.decQuantity(amount);
        if (it.getQuantity() === 0) {
            this.removeItemById(it.id);
        }
    }
}
