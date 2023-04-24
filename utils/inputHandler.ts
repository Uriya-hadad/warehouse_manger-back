export function checkIfQuantityIsValid(quantity: number, numberOfItemsSold: number) {
    if (quantity === 0) {
        throw new Error("Product is out of stock");
    } else if (quantity < numberOfItemsSold ||
        numberOfItemsSold < 1)
        throw new Error(`invalid quantity: ${numberOfItemsSold} \nAvailable: ${quantity}`);
}
