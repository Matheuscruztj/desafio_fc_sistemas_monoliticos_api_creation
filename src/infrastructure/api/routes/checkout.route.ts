import express, { Request, Response } from "express"
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";
import { PlaceOrderInputDto } from "../../../modules/checkout/facade/checkout.facade.interface";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = CheckoutFacadeFactory.create();

  try {
    const checkoutDto: PlaceOrderInputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };

    const output = await usecase.placeOrder(checkoutDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});