import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/entity/invoice-item";
import InvoiceItemInterface from "../repository/invoice-item.interface";
import { InvoiceItemModel } from "./invoice-item.model";

export default class InvoiceItemRepository implements InvoiceItemInterface {
    async create(invoiceItem: InvoiceItem): Promise<void> {
        await InvoiceItemModel.create({
            id: invoiceItem.id.id,
            productId: invoiceItem.productId,
            invoiceId: invoiceItem.invoiceId,
            quantity: invoiceItem.quantity,
            createdAt: invoiceItem.createdAt,
            updatedAt: invoiceItem.updatedAt,
        });
    }
    async findByInvoiceId(invoiceId: string): Promise<InvoiceItem[]> {
        const invoiceItems = await InvoiceItemModel.findAll({
            where: {
                invoiceId: invoiceId,
            }
        });

        if (!invoiceItems.length) {
            throw new Error("Invoice items are not found");
        }

        return invoiceItems.map((item) => 
            new InvoiceItem({
                id: new Id(item.id),
                productId: item.productId,
                invoiceId: item.invoiceId,
                quantity: item.quantity,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })
        )
    }
    async findById(id: string): Promise<InvoiceItem> {
        const invoiceItem = await InvoiceItemModel.findOne({
            where: {
                invoiceId: id,
            }
        });

        if (!invoiceItem) {
            throw new Error("Invoice item not found");
        }

        return new InvoiceItem({
            id: new Id(invoiceItem.id),
            productId: invoiceItem.productId,
            invoiceId: invoiceItem.invoiceId,
            quantity: invoiceItem.quantity,
            createdAt: invoiceItem.createdAt,
            updatedAt: invoiceItem.updatedAt,
        });
    }
}