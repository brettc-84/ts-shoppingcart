export class BasketItem {
    constructor(
        public sku: string,
        private quantity: number = 1,
        public id: number = Math.floor(Math.random() * 1000000000),
    ) { }

    public getQuantity(): number {
        return this.quantity;
    }

    public incQuantity(num: number = 1) {
        this.quantity += num;
    }

    public decQuantity(num: number = 1) {
        this.quantity -= num;
    }
}
