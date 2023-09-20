const supertest = require("supertest")
const createServer = require("../configs/server.config")
const { connect, closeConnection } = require("../configs/database.config")

const app = createServer();
const value = {}

const { staffSchema, loginStaff, staffUpdate, loginStaff_wrong} = require("./body");
const { MESSAGES, DATABASE_URI_TEST } = require("../configs/constants.config");

/* Opening database connection before all test. */
beforeAll(async () => {
    jest.setTimeout(30000);
    await connect(DATABASE_URI_TEST);
})

/* Closing database connection after all test. */
afterAll(async() =>{
    jest.setTimeout(30000);
    await closeConnection();
})

describe("Test staff Functionalities", ()=> {
    describe("Testing Staff Routes", () =>{
        // Register
        it("Register user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/register")
                    .send(staffSchema)
            expect(result.statusCode).toBe(201)
            expect(result.body.data).toMatchObject({
                _id : expect.any(String),
                fullname: expect.any(String),
                experience: expect.any(String),
                password: expect.any(String)
            })
        })

        test("Existing user", async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/register")
                    .send(staffSchema)
            expect(result.statusCode).toBe(500)
            expect(result.body.message).toBe(MESSAGES.USER.DUPLICATE_NAME)
        })

        // Login
        test("Wrong Login username", async () => {
            const result = await supertest(app)
                .post("/api/v1/staffs/login")
                .send({ fullname: "BIO BIO", email: "m@gmail.com", password: "569484544" })
            
            expect(result.statusCode).toBe(500)
            expect(result.body.message).toEqual(MESSAGES.USER.INVALID_USER_ERROR)
        })

        // Login
        test("login info doesn't match", async () => {
            const result = await supertest(app)
                .post("/api/v1/staffs/login")
                .send(loginStaff_wrong)

            expect(result.statusCode).toBe(500)
            expect(result.body.message).toEqual(MESSAGES.USER.INVALID_PASSWORD_ERROR)
        })

        test("Login user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/login")
                    .send(loginStaff)

            value.key1 = result.body.staff_id
            value.key2 = result.body.Token
            expect(result.statusCode).toBe(201)
            expect(result.body).toEqual({
                Token: expect.any(String),
                message: MESSAGES.USER.LOGGEDIN,
                success: true,
                staff_id: expect.any(String)
           })
        })

        // Get Profile
        test("Get My Profile", async () => {
            const result = await supertest(app)
                .get("/api/v1/staffs/")
                .set('Authorization', `Bearer ${value.key2}`)

                // console.info(result.body)
            expect(result.statusCode).toBe(200)
            expect(result.body.message).toEqual(MESSAGES.USER.FETCHED)
            expect(result.body).toMatchObject({ success: true });
        })

        // Update
        test("Update Member", async () => {
            const result = await supertest(app)
                .patch(`/api/v1/staffs/${value.key1}`)
                .send(staffUpdate)
                .set('Authorization', `Bearer ${value.key2}`)

            expect(result.statusCode).toBe(200)
            expect(result.body.message).toEqual(MESSAGES.USER.UPDATED)
            expect(result.body).toMatchObject({ success: true });
        })

        // Delete
        test("Delete Staff", async () => {
            const result = await supertest(app)
                .delete("/api/v1/staffs/")
                .set('Authorization', `Bearer ${value.key2}`)

            expect(result.statusCode).toBe(200)
            expect(result.body.message).toEqual(MESSAGES.USER.DELETED)
            expect(result.body).toMatchObject({ success: true });
        })
    })

    describe("Testing Staff Schema", () =>{

    })
})