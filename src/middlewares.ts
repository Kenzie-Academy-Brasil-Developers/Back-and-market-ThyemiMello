import { NextFunction, Request, Response } from "express";
import market from "./database";
import { IProduct } from "./interfaces";

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
  const productRequest: Array<IProduct> | IProduct = request.body;
  let itIsDuplicated = false;

  if(request.method === 'POST' ){
    (productRequest as Array<IProduct>).forEach(product => {
      market.forEach(productMarket => {
        if(product.name === productMarket.name){
          itIsDuplicated = true;
        }
      })
    });

  } else if(request.method === 'PATCH'){
    itIsDuplicated = market.some(product => product.name === (productRequest as IProduct).name);
  }
  
  if(itIsDuplicated){
    return response.status(409).json({error: "Product already registered"});
  }

  return next();
};

export { ensureProductsMiddleware, ensureExistProducts };
