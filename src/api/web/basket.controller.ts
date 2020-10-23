import * as express from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, httpPut, request, requestParam, response } from 'inversify-express-utils';
import { BasketItem } from '../../entities/basket-item';
import { BasketService } from '../../services/basket.service';

@controller('/baskets')
export class BasketController extends BaseHttpController {
    constructor(
        @inject('BasketService') private _basketService: BasketService
    ) {
        super();
    }

    @httpPost('/')
    private async createBasket(@request() req: express.Request, @response() res: express.Response) {
        try {
            const id = await this._basketService.createBasket();
            res.json({id}).status(201);
        } catch (err) {
            res.status(500).json({error: 'There was an error creating a basket', details: err.message});
        }
    }

    @httpGet('/')
    private async getAllBaskets(@response() res: express.Response) {
        try {
            const allBaskets = this._basketService.listBaskets();
            res.json(allBaskets).status(200);
        } catch (err) {
            res.status(500).json({error: 'There was an error getting all baskets', details: err.message});
        }
    }

    @httpGet('/:id')
    private async getBasket(@requestParam("id") id: string, @response() res: express.Response) {
        try {
            res.json(this._basketService.findBasket(parseInt(id, 10)));
        } catch (err) {
            res.status(500).json({error: 'There was an error retrieving your basket', details: err.message});
        }
    }

    @httpGet('/:id/items')
    private async getBasketItems(@requestParam("id") id: string, @response() res: express.Response) {
        try {
            res.json(this._basketService.getBasketItems(parseInt(id, 10)));
        } catch (err) {
            res.status(500).json({error: 'There was an error retrieving your basket', details: err.message});
        }
    }

    @httpPost('/:id/items')
    private async addBasketItem(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        try {
            const itemToAdd = new BasketItem(req.body.sku, req.body.quantity);
            res.json(this._basketService.addBasketItem(parseInt(id, 10), itemToAdd));
        } catch (err) {
            res.status(500).json({error: 'There was an error adding the item to your basket', details: err.message});
        }
    }
}
