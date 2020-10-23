import { Basket } from "../../entities/basket";

export interface IBasketDatabase {
    insertBasket(basket: Basket): number;
    listBaskets(): Basket[];
    findBasket(id: number): Basket;
    updateBasket(id: number, basket: Basket);
}
