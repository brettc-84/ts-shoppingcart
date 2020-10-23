import { injectable } from "inversify";
import { Basket } from "../../entities/basket";
import { BasketItem } from "../../entities/basket-item";
import { IBasketDatabase } from "./database";

@injectable()
export class InMemoryDb implements IBasketDatabase {
    private _baskets: any = { };

    public insertBasket(basket: Basket): number {
        if (!basket.id) {
            basket.id = Math.floor(Math.random() * 1000000000);
        }
        this._baskets[basket.id] = basket;
        return basket.id;
    }

    public listBaskets(): Basket[] {
        return Object.values(this._baskets);
    }

    public findBasket(id: number): Basket {
        return this._baskets[id];
    }

    public updateBasket(id: number, newBasket: Basket): Basket {
        this._baskets[id] = newBasket;
        return newBasket;
    }
}
