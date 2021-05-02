import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { Connection, createConnection } from "typeorm";
import { AppModule } from "@infrastructure/rest/app.module";
import { CatsController } from "@infrastructure/rest/cats/cats.controller";
import { settings } from "@infrastructure/database/settings";

describe("CatsController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    beforeEach(async () => {
        await clearTableData();
    });

    test("GET /cats", async () => {
        const catsController = app.get<CatsController>(CatsController);

        await catsController.addCat({ name: "Top", breed: "pussy" });

        const response = await request(app.getHttpServer()).get("/cats");

        // console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.constructor).toBe(Array);
        // return request(app.getHttpServer()).get('/cats').expect(200);
    });

    test("POST /cats", async () => {
        const response = await request(app.getHttpServer())
            .post("/cats")
            .send({ name: "Cool", breed: "Fine" });

        // console.log(response.body);

        expect(response.status).toBe(201);
    });

    it("should return > 400 error on POST /cats - validation testing", async () => {
        const response = await request(app.getHttpServer())
            .post("/cats")
            .send({ name: "Cool" });

        // console.log(response.body);

        expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test("PUT /cats/:id", async () => {
        const { body: createdCat } = await request(app.getHttpServer())
            .post("/cats")
            .send({ name: "Cool", breed: "Yummy" });

        console.log(`/cats/${createdCat.id}`);

        const updateResponse = await request(app.getHttpServer())
            .put(`/cats/${createdCat.id}`)
            .send({ name: "Cooler!" });

        console.log(updateResponse.text);

        expect(updateResponse.status).toBe(200);
    });

    it("should return 400 error on PUT /cats/:id - cat with specified ID not found", async () => {
        const { body: createdCat } = await request(app.getHttpServer())
            .post("/cats")
            .send({ name: "Cool", breed: "Yummy" });

        const updateResponse = await request(app.getHttpServer())
            .put(`/cats/0`)
            .send({ name: "Cooler!" });

        // console.log(updateResponse.status, updateResponse.body.message);

        expect(updateResponse.status).toBe(400);
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
