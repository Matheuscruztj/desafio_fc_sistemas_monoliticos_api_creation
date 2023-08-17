import express, { Request, Response } from "express"
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import { FindInvoiceUseCaseInputDTO } from "../../../modules/invoice/facade/invoice.facade.interface";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    try {
      const usecase = InvoiceFacadeFactory.create();
    const inputDto: FindInvoiceUseCaseInputDTO = {
        id: req.params.id,
    };

    console.log({
        inputDto,
    });

    const output = await usecase.find(inputDto);

    res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});