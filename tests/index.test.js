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


    it('should return 200', async () => {
        const result = await supertest(app).post("/api/users")
        // .send({ username: "ham144", password: "password", email: "yafizham@me.com", phone: "1234567890", name: "yafizham" })
        expect(result.status).toBe(200)
    })

});
