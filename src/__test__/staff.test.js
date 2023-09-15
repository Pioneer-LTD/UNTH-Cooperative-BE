const supertest = require("supertest")
const createServer = require("../configs/server.config")
const { connect, closeConnection } = require("./connect")

const app = createServer();
const value = {}

const { staffSchema, loginStaff, staffUpdate, loginStaff_wrong} = require("./body");
const { MESSAGES } = require("../configs/constants.config");

/* Closing database connection after each test. */
beforeAll(async () => {
    jest.setTimeout(30000);
    await connect();
})

/* Closing database connection after each test. */
afterAll(async() =>{
    jest.setTimeout(30000);
    await closeConnection();
})

describe("Test staff Functionalities", ()=> {
    describe("Testing Staff Routes", () =>{
        // Register
        test("Register user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/register")
                    .send(staffSchema)
            
            expect(result.statusCode).toBe(201)
            expect(result.body.data).toMatchObject({
                _id : expect.any(String),
                fullname: expect.any(String),
                experience: expect.any(String),
                passsword: expect.any(String),
            })
        })

        test("Existing user", async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/register")
                    .send(staffSchema)
            
            expect(result.statusCode).toBe(400)
            expect(result.body.message).toBe(MESSAGES.USER.DUPLICATE_NAME)
        })

        // Login
        test("Wrong Login username", async () => {
            const result = await supertest(app)
                .post("/api/v1/staffs/login")
                .send({ fullname: "BIO BIO", password: "569484" })

            expect(result.statusCode).toBe(400)
            expect(result.body.message).toEqual(MESSAGES.USER.INVALID_USER_ERROR)
        })

        // Login
        test("login info doesn't match", async () => {
            const result = await supertest(app)
                .post("/api/v1/staffs/login")
                .send(loginStaff_wrong)

            expect(result.statusCode).toBe(400)
            expect(result.body.message).toEqual(MESSAGES.USER.INVALID_PASSWORD_ERROR)
        })

        test("Login user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/staffs/login")
                    .send(loginMember1)

            value.key1 = result.body.Member_id
            value.key2 = result.body.Token
            expect(result.statusCode).toBe(201)
            expect(result.body).toEqual({
                Token: expect.any(String),
                message: MESSAGES.USER.LOGGEDIN,
            })
        })

        // Get Profile
        test("Get My Profile", async () => {
            const result = await supertest(app)
                .get("/api/v1/staffs/")
                .set('Authorization', `Bearer ${value.key2}`)

                // console.info(result.body)
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toEqual(MESSAGES.USER.FETCHED)
            expect(result.body).toMatchObject({ success: true });
        })

        // Update
        test("Update Member", async () => {
            const result = await supertest(app)
                .patch("/api/v1/members/")
                .send({ married: true, level: "5", state_of_origin: "Anambra", LGA: "Njikoka" })
                .set('Authorization', `Bearer ${value.key2}`)

            expect(result.statusCode).toBe(200)
            expect(result.body.message).toEqual(MESSAGES.USER.UPDATED)
            expect(result.body).toMatchObject({ success: true });
        })
    })
})