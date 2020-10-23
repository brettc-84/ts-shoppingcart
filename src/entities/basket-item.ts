export class BasketItem {
    constructor(
        public sku: string,
        private quantity: number = 1
    ) { }

    public getQuantity(): number {
        return this.quantity;
    }

    public incQuantity() {
        this.quantity++;
    }

    public decQuantity() {
        this.quantity--;
    }
}
