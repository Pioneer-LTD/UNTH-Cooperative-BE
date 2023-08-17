const supertest = require("supertest")
const createServer = require("../configs/server.config")
const { connect, closeConnection } = require("./connect")

const app = createServer();

const { RegisterMember1,
    RegisterMember2,
    loginMember1,
    loginMember2 } = require("./body")

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
        test("Register user",async () => {
            const result = (await supertest(app).post("api/v1/members/")).send(RegisterMember1)
        })
    })
})