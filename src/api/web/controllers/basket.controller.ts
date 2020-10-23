import * as express from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpDelete, httpGet, httpPatch, httpPost, httpPut, queryParam, request, requestParam, response } from 'inversify-express-utils';
import { BasketItem } from '../../../entities/basket-item';
import { BasketService } from '../../../services/basket.service';
import { UpdateItemRequestDTO } from '../../models/UpdateItemRequestDTO';

@controller('/baskets')
export class BasketController extends BaseHttpController {
  constructor(@inject('BasketService') private _basketService: BasketService) {
    super();
  }

  @httpPost('/')
  private async createBasket(@request() req: express.Request, @response() res: express.Response) {
    try {
      const id = await this._basketService.createBasket();
      res.json({ id }).status(201);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error creating a basket',
        details: err.message,
      });
    }
  }

  @httpGet('/')
  private async getAllBaskets(@response() res: express.Response) {
    try {
      const allBaskets = this._basketService.listBaskets();
      res.json(allBaskets).status(200);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error getting all baskets',
        details: err.message,
      });
    }
  }

  @httpGet('/:id')
  private async getBasket(@requestParam('id') id: string, @response() res: express.Response) {
    try {
      const basketId = parseInt(id);
      res.json(this._basketService.findBasket(basketId));
    } catch (err) {
      res.status(500).json({
        error: 'There was an error retrieving your basket',
        details: err.message,
      });
    }
  }

  @httpGet('/:id/items')
  private async getBasketItems(@requestParam('id') id: string, @response() res: express.Response) {
    try {
      const basketId = parseInt(id);
      res.json(this._basketService.getBasketItems(basketId));
    } catch (err) {
      res.status(500).json({
        error: 'There was an error retrieving your basket',
        details: err.message,
      });
    }
  }

  @httpPost('/:id/items')
  private async addBasketItem(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response) {
    try {
      const basketId = parseInt(id);
      const itemToAdd = new BasketItem(req.body.sku, req.body.quantity);
      res.json(this._basketService.addBasketItem(basketId, itemToAdd)).status(201);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error adding the item to your basket',
        details: err.message,
      });
    }
  }

  @httpDelete('/:basketId/items/:itemId')
  private async removeItem(@requestParam('basketId') basketId: string, @requestParam('itemId') itemId: string, @request() req: express.Request, @response() res: express.Response) {
    try {
      const bId = parseInt(basketId);
      const iId = parseInt(itemId);
      res.json(this._basketService.removeBasketItem(bId, iId)).status(200);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error removing the item to your basket',
        details: err.message,
      });
    }
  }

  @httpPatch('/:basketId/items/:itemId')
  private async updateBasketItem(@requestParam('basketId') basketId: string, @requestParam('itemId') itemId: string, @request() req: express.Request, @response() res: express.Response) {
    try {
      const bId = parseInt(basketId);
      const iId = parseInt(itemId);
      const updateRequest = { action: req.body.action, quantity: req.body.quantity } as UpdateItemRequestDTO;
      res.json(this._basketService.updateBasketItemQuantity(bId, iId, updateRequest)).status(200);
    } catch (err) {
      res.status(500).json({
        error: 'There was an error adding the item to your basket',
        details: err.message,
      });
    }
  }

  @httpPost('/createData')
  private async createTestData(@response() res: express.Response) {
    this._basketService.createTestData();
    res.send(200);
  }
}
