const supertest = require("supertest")
const createServer = require("../configs/server.config")
const { connect, closeConnection } = require("./connect")

const app = createServer();
const value = {}

const { RegisterMember1,
    RegisterMember2,
    loginMember1,
    loginMember2, 
    loan1,
    loan2 } = require("./body");
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

describe("Test member Functionalities", ()=> {
    describe("Testing Member Routes", () =>{
        // Register
        test("Register user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/members/register")
                    .send(RegisterMember1)
            
            expect(result.statusCode).toBe(200)
            expect(result.body.data).toMatchObject({
                _id : expect.any(String),
                ippis : expect.any(Number),
                first_name: expect.any(String),
                last_name: expect.any(String),
                dept_unit: expect.any(String),
                designation: expect.any(String),
                email: expect.any(String),
                mobile_phone: expect.any(String)
            })
        })

        test("Existing user", async () => {
            const result = await supertest(app)
                    .post("/api/v1/members/register")
                    .send(RegisterMember1)
            
            expect(result.statusCode).toBe(400)
            expect(result.body.message).toBe(MESSAGES.USER.DUPLICATE_ERROR)
        })

        // Login
        test("Wrong Login Password", async () => {
            const result = await supertest(app)
                .post("/api/v1/members/login")
                .send({ ippis: "556374", password: "569484" })

            expect(result.statusCode).toBe(400)
            expect(result.body.message).toEqual(MESSAGES.USER.INVALID_PASSWORD_ERROR)
        })

        test("Login user",async () => {
            const result = await supertest(app)
                    .post("/api/v1/members/login")
                    .send(loginMember1)

            value.key1 = result.body.Member_id
            value.key2 = result.body.token
            expect(result.statusCode).toBe(200)
            expect(result.body).toEqual({
                token: expect.any(String),
                Token_Type: "Bearer",
                Member_id: expect.any(String)
            })
        })

        // Get Profile
        test("Get My Profile", async () => {
            const result = await supertest(app)
                .get("/api/v1/members/")
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

    describe("Testing Loan Routes", () =>{
        test("Register loan",async () => {
            const result = await supertest(app)
                    .post("/api/v1/members/loans/register")
                    .set('Authorization', `Bearer ${value.key2}`)
                    .send(loan1)
                
            expect(result.statusCode).toBe(200)
            expect(result.body.message).toBe( MESSAGES.LOAN.CREATED)
            expect(result.body.data).toMatchObject({
                _id : expect.any(String),
                loan_amt : expect.any(String),
                tenor: expect.any(String),
                rate: expect.any(Number),
                intrest: expect.any(Number),
                status: expect.any(String),
            })
        })

        test("Register existing loan", async () => {
            const result = await supertest(app)
                    .post("/api/v1/members/loans/register")
                    .set('Authorization', `Bearer ${value.key2}`)
                    .send(loan2)    
            
            expect(result.statusCode).toBe(500)
            expect(result.body.message).toBe(MESSAGES.LOAN.INVALID_LOAN_EXISTING)
        })

        test("Update loan", async () => {
            const result = await supertest(app)
                    .patch("/api/v1/members/loans/")
                    .set('Authorization', `Bearer ${value.key2}`)
                    .send({ loan_amt: "300000"})
            
            expect(result.statusCode).toBe(200)
            expect(result.body.message).toBe(MESSAGES.LOAN.UPDATED)
        })

        test("Get my loan", async () => {
            const result = await supertest(app)
                    .get("/api/v1/members/loans/")
                    .set('Authorization', `Bearer ${value.key2}`)
            
            expect(result.statusCode).toBe(201)
            expect(result.body.message).toBe(MESSAGES.LOAN.FETCHED)
        })

        test("Delete pending loan", async () => {
            const result = await supertest(app)
                    .delete("/api/v1/members/loans/")
                    .set('Authorization', `Bearer ${value.key2}`)
            
            expect(result.statusCode).toBe(200)
            expect(result.body.message).toBe( MESSAGES.LOAN.DELETED )
        })
    })
    // Delete
        test("Delete Member", async () => {
            const result = await supertest(app)
                .delete("/api/v1/members/")
                .set('Authorization', `Bearer ${value.key2}`)

            expect(result.statusCode).toBe(200)
            expect(result.body.message).toEqual(MESSAGES.USER.DELETED)
            expect(result.body).toMatchObject({ success: true });
        })
})