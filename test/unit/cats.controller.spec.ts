import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatsController } from "@infrastructure/rest/cats/cats.controller";
import { CatsService } from "@infrastructure/rest/cats/cats.service";
import { settings } from "@infrastructure/database/settings";
import { Cat } from "@/infrastructure/rest/cats/cat.entity";
import { Connection, createConnection } from "typeorm";

describe("CatsController", () => {
    let app: TestingModule;
    let catsController: CatsController;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(settings),
                TypeOrmModule.forFeature([Cat]),
            ],
            controllers: [CatsController],
            providers: [CatsService],
        }).compile();

        catsController = app.get<CatsController>(CatsController);
    });

    beforeEach(async () => {
        await clearTableData();
    });

    it("should return array of Cats", async () => {
        const { id: firstCatId } = await catsController.addCat({
            name: "Xane",
            breed: "American",
        });
        const { id: secondCatId } = await catsController.addCat({
            name: "Pussy",
            breed: "American",
        });

        await catsController.updateCat(secondCatId, {
            name: "Pretty Pussy",
            breed: "American",
        });

        const result = await catsController.getCats();
        console.log(result);

        // expect(true).toBe(true);
        expect(result.constructor).toBe(Array);
        expect(result.length).toBe(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "Pretty Pussy" }),
            ])
        );
    });

    afterAll((done) => {
        app.close();
        done();
    });

    async function clearTableData() {
        const connection: Connection = await createConnection({
            ...settings,
            name: "reset",
        });

        await connection.manager.query("DELETE FROM cats");

        await connection.close();
    }
});
