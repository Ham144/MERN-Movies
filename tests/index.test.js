import supertest from "supertest";
import { app } from "../backend/index.js"
import prisma from "../backend/utils/database/prisma.js";


describe('testing index.js', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be return response hello World', async () => {
        const result = await supertest(app).get("/")
        expect(result.text).toBe("Hello World!")
        expect(result.status).toBe(200)
        expect(result.headers["content-type"]).toBe("text/html; charset=utf-8")
    });

});
