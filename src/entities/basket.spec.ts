import { Basket } from "./basket";
import { BasketItem } from "./basket-item";

describe("Basket", () => {
    let basket: Basket;
    beforeEach(() => {
        basket = new Basket();
    });
    it('should have an id associated', () => {
        expect(basket.id).not.toBeUndefined();
    });
    it("should be empty when created", () => {
        const items = basket.getItems();
        expect(items).toHaveLength(0);
    });
    it('should add a new item', () => {
        const item = new BasketItem('m/1/n', 1);
        basket.addItem(item);
        expect(basket.basketItems).toHaveLength(1);
    });
    it('should add a new item with qty 1 by default', () => {
        const item = new BasketItem('m/1/n');
        basket.addItem(item);
        expect(basket.basketItems).toHaveLength(1);
    });
    it('should not add the same item twice', () => {
        const item = new BasketItem('m/1/n');
        basket.addItem(item);
        basket.addItem(item);
        expect(basket.basketItems).toHaveLength(1);
    });
});