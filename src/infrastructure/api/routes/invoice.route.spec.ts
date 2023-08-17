import request from 'supertest'
import { Sequelize } from "sequelize";
import { Umzug } from "umzug";
import { app, migration, sequelize, setupDb } from "../express";
import { migrator } from "../../db/config-migrations/migrator";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import { AddProductInputDto } from '../../../modules/product-adm/usecase/add-product/add-product.dto';
import { PlaceOrderInputDto } from '../../../modules/checkout/facade/checkout.facade.interface';

describe("Invoice tests", () => {
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

    it("should find an invoice", async () => {
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

        expect(checkoutResponse.body.invoiceId).toBeDefined();
        
        const invoiceResponse = await request(app).get(`/invoice/${checkoutResponse.body.invoiceId}`);

        expect(invoiceResponse.status).toBe(200);
        expect(invoiceResponse.body.id).toBeDefined();
        expect(invoiceResponse.body.name).toBe(clientDto.name);
        expect(invoiceResponse.body.document).toBe(clientDto.document);
        expect(invoiceResponse.body.address.street).toBe(clientDto.street);
        expect(invoiceResponse.body.address.number).toBe(clientDto.number);
        expect(invoiceResponse.body.address.complement).toBe(clientDto.complement);
        expect(invoiceResponse.body.address.city).toBe(clientDto.city);
        expect(invoiceResponse.body.address.state).toBe(clientDto.state);
        expect(invoiceResponse.body.address.zipCode).toBe(clientDto.zipCode);
        expect(invoiceResponse.body.items.length).toBe(1);
        expect(invoiceResponse.body.items[0].id).toBe(productDto.id);
        expect(invoiceResponse.body.items[0].name).toBe(productDto.name);
        expect(invoiceResponse.body.items[0].price).toBe(productDto.salesPrice);
        expect(invoiceResponse.body.total).toBe(productDto.salesPrice);
    });
});  