import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { migrator } from "../../db/config-migrations/migrator";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import { app, migration, sequelize, setupDb } from "../express";

describe("Client tests", () => {
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

    it("should create a client", async () => {
      const inputDto: AddClientInputDto = {
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

      const response = await request(app).post("/clients").send(inputDto);

      expect(response.status).toBe(200);
    });
});