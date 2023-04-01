import { NextFunction, Request, Response } from "express";
import market from "./database";
import { ICleningProduct, IFoodProduct } from "./interfaces";

const ensureProductsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((mark) => mark.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  };

  return next();
};

const ensureExistProducts = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const productData: Array<ICleningProduct | IFoodProduct> = request.body
 
  const productRepit = productData.some((newProduct) =>
    market.some((productExist) => productExist.name === newProduct.name)
  );

  if (productRepit) {
    return response.status(409).json({
      error: "Product already registered",
    });
  }

  return next();
};

export { ensureProductsMiddleware, ensureExistProducts };
