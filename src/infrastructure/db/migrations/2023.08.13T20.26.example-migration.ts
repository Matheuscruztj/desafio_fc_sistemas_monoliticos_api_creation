import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('clients', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        document: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    await sequelize.getQueryInterface().createTable('products', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        purchasePrice: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        salesPrice: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        stock: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        updatedAt: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: { 
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    await sequelize.getQueryInterface().createTable('transactions', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        amount: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        order_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    });
    await sequelize.getQueryInterface().createTable('invoices', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        document: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    await sequelize.getQueryInterface().createTable('invoice_items', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        invoiceId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    await sequelize.getQueryInterface().createTable('order', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        clientId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    });
    await sequelize.getQueryInterface().createTable('order_items', {
        orderId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        productId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('clients');
    await sequelize.getQueryInterface().dropTable('products');
    await sequelize.getQueryInterface().dropTable('transactions');
    await sequelize.getQueryInterface().dropTable('invoices');
    await sequelize.getQueryInterface().dropTable('invoice_items');
    await sequelize.getQueryInterface().dropTable('order');
    await sequelize.getQueryInterface().dropTable('order_items');
} 
