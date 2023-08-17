import request from 'supertest'
import { Sequelize } from "sequelize";
import { Umzug } from "umzug";
import { app, migration, sequelize, setupDb } from "../express";
import { migrator } from "../../db/config-migrations/migrator";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import { AddProductInputDto } from '../../../modules/product-adm/usecase/add-product/add-product.dto';
import { PlaceOrderInputDto } from '../../../modules/checkout/facade/checkout.facade.interface';

describe("Checkout tests", () => {
    let _migration: Umzug<any>;
    let _sequelize: Sequelize;
  
    beforeEach(async () => {
        await setupDb();
        _migration = migration;
        _sequelize = sequelize;
    });
    
    afterEach(async () => {
        if (!_migration || !_sequelize) {
            return;
        }
        _migration = migrator(_sequelize)
        await _migration.down()
        await _sequelize.close()
    });

    it("should create an order", async () => {
        const clientDto: AddClientInputDto = {
            id: "1",
            address: "Address 1",
            name: "Client 1",
            email: "example@test.com",
            city: "City 1",
            state: "State 1",
            complement: "Complement 1",
            document: "Document 1",
            number: "Number 1",
            street: "Street 1",
            zipCode: "ZipCode 1",
        }
    
        const clientResponse = await request(app).post("/clients").send(clientDto);

        expect(clientResponse.status).toBe(200);

        const productDto: AddProductInputDto = {
            id: "1",
            description: "Description 1",
            name: "Product 1",
            purchasePrice: 10,
            salesPrice: 150,
            stock: 100,
        }
    
        const productResponse = await request(app).post("/products").send(productDto);
    
        expect(productResponse.status).toBe(200);

        const checkoutDto: PlaceOrderInputDto = {
            clientId: "1",
            products: [
                { productId: "1" },
            ]
        }

        const checkoutResponse = await request(app).post("/checkout").send(checkoutDto);

        expect(checkoutResponse.status).toBe(200);

        expect(checkoutResponse.body.id).toBeDefined();
        expect(checkoutResponse.body.invoiceId).toBeDefined();
        expect(checkoutResponse.body.status).toBe("approved");
        expect(checkoutResponse.body.total).toBe(productDto.salesPrice);
        expect(checkoutResponse.body.products).toHaveLength(checkoutDto.products.length);
        expect(checkoutResponse.body.products[0].productId).toBe(checkoutDto.products[0].productId);
    });
});  