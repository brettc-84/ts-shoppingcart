import { inject, injectable } from "inversify";
import { UpdateItemRequestDTO } from "../api/models/UpdateItemRequestDTO";
import { Basket } from "../entities/basket";
import { BasketItem } from "../entities/basket-item";
import { IBasketDatabase } from "../infrastructure/data/database";
import { TYPES } from "../types";

@injectable()
export class BasketService {
    @inject(TYPES.IBasketDatabase) private _basketDb: IBasketDatabase;

    createTestData(): void {
        this._basketDb.createTestData();
    }

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
        this._basketDb.updateBasket(id, basket);
        return basket.basketItems;
    }

    updateBasketItemQuantity(basketId: number, itemId: number, updateRequest: UpdateItemRequestDTO): BasketItem {
        const basket = this._basketDb.findBasket(basketId);
        if (updateRequest.action === 'inc') {
            basket.incItemQuantity(itemId, updateRequest.quantity);
        } else if (updateRequest.action === 'dec') {
            basket.decItemQuantity(itemId, updateRequest.quantity);
        }
        this._basketDb.updateBasket(itemId, basket);
        return basket.getItemById(itemId);
    }

    removeBasketItem(basketId: number, itemId: number): BasketItem[] {
        const basket = this._basketDb.findBasket(basketId);
        basket.removeItemById(itemId);
        this._basketDb.updateBasket(basketId, basket);
        return basket.basketItems;
    }
}
