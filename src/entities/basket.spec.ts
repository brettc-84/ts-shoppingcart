import { Basket } from './basket';
import { BasketItem } from './basket-item';

describe('Basket', () => {
  let basket: Basket;
  beforeEach(() => {
    basket = new Basket();
  });
  it('should be empty when created', () => {
    const items = basket.getItems();
    expect(items).toHaveLength(0);
  });
  it('should add a new item', () => {
    const item = new BasketItem('11112', 1);
    basket.addItem(item);
    expect(basket.basketItems).toHaveLength(1);
  });
  it('should add a new item with qty 1 by default', () => {
    const item = new BasketItem('11112');
    basket.addItem(item);
    expect(basket.basketItems).toHaveLength(1);
  });
  it('should not add the same item twice', () => {
    const item = new BasketItem('11112');
    basket.addItem(item);
    basket.addItem(item);
    expect(basket.basketItems).toHaveLength(1);
  });
  it('should not be allowed to reduce quantity to negative', () => {
    const item = new BasketItem('11112');
    basket.addItem(item);
    expect(() => {
      basket.decItemQuantity(item.id, 10);
    }).toThrow('Cannot decrease quantity to negative value');
  });
  it('should not be allowed to update an item that does not exist', () => {
    const item = new BasketItem('11112');
    expect(() => {
      basket.decItemQuantity(item.id, 10);
    }).toThrow('Item does not exist in basket');
    expect(() => {
      basket.incItemQuantity(item.id, 10);
    }).toThrow('Item does not exist in basket');
  });
  it('should remove an item', () => {
    const item = new BasketItem('11112');
    basket.addItem(item);
    basket.removeItemById(item.id);
    expect(basket.basketItems).toHaveLength(0);
  });
  it('should remove the item if quanity is decreased to zero', () => {
    const item = new BasketItem('11112');
    basket.addItem(item);
    basket.decItemQuantity(item.id, 1);
    expect(basket.basketItems).toHaveLength(0);
  });
});
