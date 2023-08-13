import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "x@x.com",
    document: "Document 1",
    address: "Address 1",
    city: "City 1",
    complement: "Complement 1",
    number: "Number 1",
    state: "State 1",
    street: "Street 1",
    zipCode: "ZipCode 1",
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
};

describe("Find Client Usecase unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.document).toEqual(client.document);
        expect(result.address).toEqual(client.address);
        expect(result.street).toEqual(client.street);
        expect(result.city).toEqual(client.city);
        expect(result.complement).toEqual(client.complement);
        expect(result.number).toEqual(client.number);
        expect(result.state).toEqual(client.state);
        expect(result.zipCode).toEqual(client.zipCode);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
    });
});