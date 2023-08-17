import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { migrator } from "../../db/config-migrations/migrator";
import { AddProductInputDto } from '../../../modules/product-adm/usecase/add-product/add-product.dto';
import { app, migration, sequelize, setupDb } from "../express";

describe("Product tests", () => {
  let _migration: Umzug<any>;
  let _sequelize: Sequelize;

    beforeEach(async () => {
      await setupDb();
      _migration = migration;
      _sequelize = sequelize;
    })
  
    afterEach(async () => {
      if (!_migration || !_sequelize) {
        return 
      }
      _migration = migrator(_sequelize)
      await _migration.down()
      await _sequelize.close()
    })

    it("should create a product", async () => {
      const inputDto: AddProductInputDto = {
        id: "1",
        description: "Description 1",
        name: "Product 1",
        purchasePrice: 10,
        salesPrice: 15,
        stock: 10,
      }

      const response = await request(app).post("/products").send(inputDto);

      expect(response.status).toBe(200);
    });
});