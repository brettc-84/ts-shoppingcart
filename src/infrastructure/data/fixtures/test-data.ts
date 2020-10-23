import { Basket } from "../../../entities/basket";
import { BasketItem } from "../../../entities/basket-item";

const basket = new Basket(1);
basket.addItem(new BasketItem('12063', 1, 101));
basket.addItem(new BasketItem('13044', 1, 102));

export const testData = {
    1: basket,
}
