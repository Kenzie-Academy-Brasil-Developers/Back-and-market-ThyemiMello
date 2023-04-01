import { Request, Response } from "express";
import { ICleningProduct, IFoodProduct, IProduct } from "./interfaces";
import market from "./database";

let id = 1;

const createProduct = (request: Request, response: Response): Response => {
  const productData: Array<ICleningProduct | IFoodProduct> = request.body;

  const allProduct = productData.map((product) => {
    const newProduct: IProduct = {
      id: id++,
      ...product,
      expirationDate: new Date(),
    };

    market.push(newProduct);

    return newProduct;
  });
  const prices: Array<number> = [];

  allProduct.forEach((product) => {
    prices.push(product.price);

    return prices;
  });

  const totalPrice = prices.reduce((acc, act) => {
    return acc + act;
  });

  const returnProduct = {
    total: totalPrice,
    marketProducts: allProduct,
  };

  return response.status(201).json(returnProduct);
};

const listAllProducts = (request: Request, response: Response): Response => {
  const prices: Array<number> = [];

  market.forEach((product) => {
    prices.push(product.price);

    return prices;
  });

  const totalPrice = prices.reduce((acc, act) => {
    return acc + act;
  }, 0);

  const returnProduct = {
    total: totalPrice,
    marketProducts: market,
  };

  return response.json(returnProduct);
};

const retriveProduct = (request: Request, response: Response): Response => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((mark) => mark.id === id);

  return response.json(market[findIndex]);
};

const updateProduct = (request: Request, response: Response): Response => {
  const index = response.locals.product.indexChocolate;
  const updateData = request.body;

  market[index] = {
    ...market[index],
    ...updateData,
  };
  return response.json(market[index]);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const index = response.locals.product.indexProduct;

  market.splice(index, 1);

  return response.status(204).send();
};
export {
  createProduct,
  listAllProducts,
  retriveProduct,
  updateProduct,
  deleteProduct,
};
