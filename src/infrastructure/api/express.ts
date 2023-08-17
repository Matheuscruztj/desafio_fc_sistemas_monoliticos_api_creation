import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./routes/client.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { migrator } from "../db/config-migrations/migrator";
import { Umzug } from "umzug";
import { productRoute } from "./routes/product.route";
import { ProductModel as ProductAdmMProdutModel} from "../../modules/product-adm/repository/product.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import { OrderItemModel } from "../../modules/checkout/repository/order_item.model";
import { checkoutRoute } from "./routes/checkout.route";
import { ProductModel as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { ProductModel as InvoiceProductModel } from "../../modules/invoice/repository/product.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { invoiceRoute } from "./routes/invoice.route";

export const app: Express = express();
app.use(express.json());

app.use('/clients', clientRoute);
app.use('/products', productRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoice', invoiceRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;

export async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });

    sequelize.addModels([
        ClientModel,
        ProductAdmMProdutModel,
        OrderModel,
        OrderItemModel,
        StoreCatalogProductModel,
        TransactionModel,
        InvoiceModel,
        InvoiceProductModel,
        InvoiceItemModel,
    ]);
    migration = migrator(sequelize);
    await migration.up();
}

setupDb();