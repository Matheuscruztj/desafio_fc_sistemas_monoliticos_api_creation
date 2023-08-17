import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import { ProductModel } from "../../store-catalog/repository/product.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export class OrderItemModel extends Model {
    @ForeignKey(() => OrderModel)
    @PrimaryKey
    @Column({ allowNull: false })
    declare orderId: string;

    @ForeignKey(() => ProductModel)
    @PrimaryKey
    @Column({ allowNull: false })
    declare productId: string;

    @BelongsTo(() => OrderModel)
    orders: OrderModel[];
}