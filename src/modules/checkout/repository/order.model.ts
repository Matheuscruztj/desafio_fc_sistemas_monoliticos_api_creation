import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderItemModel } from "./order_item.model";
import { ProductModel } from "../../store-catalog/repository/product.model";

@Table({
    tableName: "order",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
    
    @Column({ allowNull: false })
    declare clientId: string;

    @Column({ allowNull: false })
    declare status: string;
    
    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(() => OrderItemModel)
    orderItems!: OrderItemModel[];
}