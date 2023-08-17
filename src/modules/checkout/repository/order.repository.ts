import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";
import { OrderItemModel } from "./order_item.model";

export default class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        const orderModel = await OrderModel.create({
            id: order.id.id,
            clientId: order.client.id.id,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });

        const orderItems = order.products.map(item => ({
            orderId: orderModel.id,
            productId: item.id.id,
        }));

        await OrderItemModel.bulkCreate(orderItems);
    }
    async findOrder(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id } });

        if (!orderModel) {
            throw new Error(`Order with id ${id} not found`);
        }

        const orderItems = await OrderItemModel.findAll({ where: { orderId: orderModel.id } });

        const products = await Promise.all(orderItems.map(async item => {
            const productModel = await ProductModel.findByPk(item.productId);
            const product = new Product({
                id: new Id(productModel.id),
                name: productModel.name,
                description: productModel.description,
                salesPrice: productModel.salesPrice,
                createdAt: productModel.createdAt,
                updatedAt: productModel.updatedAt,
            });
            return product;
        }));

        const clientModel = await ClientModel.findByPk(orderModel.clientId);
        const client = new Client({
            id: new Id(clientModel.id),
            name: clientModel.name,
            email: clientModel.email,
            address: clientModel.address,
            createdAt: clientModel.createdAt,
            updatedAt: clientModel.updatedAt,
        });

        const order = new Order({
            id: new Id(orderModel.id),
            client,
            products,
            status: orderModel.status,
            createdAt: orderModel.createdAt,
            updatedAt: orderModel.updatedAt,
        });

        return order;
    }
}