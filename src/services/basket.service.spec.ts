import 'reflect-metadata';
import { Basket } from '../entities/basket';

import {Container} from 'inversify';
import {TYPES} from '../types';

import { InMemoryDb } from '../infrastructure/data/in-memory-db';
import { BasketService } from './basket.service';

// TODO: fix this test :/
xdescribe('basket service', () => {
  const testDb: InMemoryDb = new InMemoryDb();
  let basketService: BasketService;
  let container;

  beforeAll(() => {
      basketService = new BasketService();
      container = new Container();
      testDb.insertBasket(new Basket());
      testDb.insertBasket(new Basket());
      container.bind(TYPES.IBasketDatabase).toConstantValue(testDb);
  });
  it('should get all baskets', () => {
    expect(basketService.listBaskets()).toHaveLength(2);
  });
});
