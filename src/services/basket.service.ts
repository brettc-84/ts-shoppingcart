import { inject, injectable } from "inversify";
import { Basket } from "../entities/basket";
import { BasketItem } from "../entities/basket-item";
import { IBasketDatabase } from "../infrastructure/data/database";
import { TYPES } from "../types";

@injectable()
export class BasketService {
    @inject(TYPES.IBasketDatabase) private _basketDb: IBasketDatabase;

    createBasket(): number {
        const newBasket = new Basket();
        return this._basketDb.insertBasket(newBasket);
    }

    listBaskets(): Basket[] {
        return this._basketDb.listBaskets();
    }

    findBasket(id: number): Basket {
        return this._basketDb.findBasket(id);
    }

    getBasketItems(id: number): BasketItem[] {
        return this._basketDb.findBasket(id).getItems();
    }

    addBasketItem(id: number, item: BasketItem): BasketItem[] {
        const basket = this._basketDb.findBasket(id);
        basket.addItem(item);
        return basket.basketItems;
    }
}
