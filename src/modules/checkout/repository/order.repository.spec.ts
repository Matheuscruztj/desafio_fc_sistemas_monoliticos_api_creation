import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import OrderRepository from "./order.repository";
import { OrderItemModel } from "./order_item.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import OrderModel from "./order.model";
import ProductModel from "../../store-catalog/repository/product.model";
import Product from "../domain/product.entity";

describe("OrderRepository", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([OrderModel, ClientModel, ProductModel, OrderItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    describe("addOrder", () => {
        it("should add a new order to the database", async () => {
            const clientInput = {
                id: new Id("1"),
                name: "John Doe",
                email: "john.doe@example.com",
                address: "Address 1"
            };

            await ClientModel.create({
                id: clientInput.id.id,
                name: clientInput.name,
                email: clientInput.email,
                document: "Document 1",
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1",
                address: clientInput.address,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const client = new Client({
                id: new Id(clientInput.id.id),
                name: clientInput.name,
                email: clientInput.email,
                address: clientInput.address,
            });

            const productInput = {
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 10.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await ProductModel.create({
                id: productInput.id.id,
                name: productInput.name,
                description: productInput.description,
                salesPrice: productInput.salesPrice,
                createdAt: productInput.createdAt,
                updatedAt: productInput.updatedAt,
            });

            const product = new Product({
                id: new Id(productInput.id.id),
                name: productInput.name,
                description: productInput.description,
                salesPrice: productInput.salesPrice,
            });

            const order = new Order({
                id: new Id("1"),
                client,
                products: [product],
                status: "pending",
            });

            const orderRepository = new OrderRepository();
            await orderRepository.addOrder(order);

            let orderDb = await OrderModel.findOne({
                where: {
                    id: order.id.id,
                }
            });

            orderDb = orderDb.toJSON();

            expect(orderDb.id).toBe(order.id.id);
            expect(orderDb.clientId).toBe(client.id.id);
            expect(orderDb.status).toBe("pending");

            const orderItems = await OrderItemModel.findAll({ where: { orderId: "1" } });

            expect(orderItems).toHaveLength(1);
            expect(orderItems[0].productId).toBe("1");
        });
    });

    describe("findOrder", () => {
        it("should find an order by ID", async () => {
            const clientInput = {
                id: new Id("1"),
                name: "John Doe",
                email: "john.doe@example.com",
                address: "Address 1",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await ClientModel.create({
                id: clientInput.id.id,
                name: clientInput.name,
                email: clientInput.email,
                document: "Document 1",
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "ZipCode 1",
                address: clientInput.address,
                createdAt: clientInput.createdAt,
                updatedAt: clientInput.updatedAt,
            });

            const client = new Client({
                id: new Id(clientInput.id.id),
                name: clientInput.name,
                email: clientInput.email,
                address: clientInput.address,
                createdAt: clientInput.createdAt,
                updatedAt: clientInput.updatedAt,
            });

            const productInput = {
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 10.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await ProductModel.create({
                id: productInput.id.id,
                name: productInput.name,
                description: productInput.description,
                salesPrice: productInput.salesPrice,
                createdAt: productInput.createdAt,
                updatedAt: productInput.updatedAt,
            });

            const product = new Product({
                id: new Id(productInput.id.id),
                name: productInput.name,
                description: productInput.description,
                salesPrice: productInput.salesPrice,
                createdAt: productInput.createdAt,
                updatedAt: productInput.updatedAt,
            });

            const orderInput = new Order({
                id: new Id("1"),
                client,
                products: [product],
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const orderRepository = new OrderRepository();
            await orderRepository.addOrder(orderInput);

            const orderOutput = await orderRepository.findOrder(orderInput.id.id);

            expect(orderInput).toStrictEqual(orderOutput);
        });
    });
});