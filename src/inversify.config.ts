import {Container} from 'inversify';
import {TYPES} from './types';

import './api/web/controllers/basket.controller';
import { BasketService } from './services/basket.service';
import { IBasketDatabase } from './infrastructure/data/database';
import { InMemoryDb } from './infrastructure/data/in-memory-db';

const container = new Container();
container.bind<BasketService>('BasketService').to(BasketService).inSingletonScope();
container.bind<IBasketDatabase>(TYPES.IBasketDatabase).to(InMemoryDb).inSingletonScope();
export {container};
