import express, { Express } from "express";
import request from 'supertest'
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./clientRoute";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { migrator } from "./config-migrations/migrator";
import { AddClientInputDto } from "../../modules/client-adm/usecase/add-client/add-client.usecase.dto";

describe("Client tests", () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/clients", clientRoute)
  
    let sequelize: Sequelize
  
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
      })
      
      sequelize.addModels([ClientModel])
      migration = migrator(sequelize)
      await migration.up()
    })
  
    afterEach(async () => {
      if (!migration || !sequelize) {
        return 
      }
      migration = migrator(sequelize)
      await migration.down()
      await sequelize.close()
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