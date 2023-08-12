require('dotenv').config()

module.exports = {
    DATABASE_URI: process.env.DATABASE_URI,

    COOKIE_SECRET: process.env.COOKIE_SECRET,

    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    MAXAGE: 3 * 24 * 60 * 60,
    BASEPATH: "/api/v1",
    ENUM: {
        USER: "user",
        ADMIN: "admin",
        PENDING: "pending",
        SUCCESSFUL: "successful",
        REJECTED: "rejected",
        VERIFIED: "verified",
        NOT_VERIFIED: "notVerified",
        SEND: "send",
        DEPOSIT: "deposit",
        WITHDRAWAL: "withdrawal"
    },
    DATABASES: {
        USER: "user",
        TRANSACTION: "transaction",
        BANK_DETAIL: "bank_detail",
    },
    MESSAGES: {
        DATABASE: {
            CONNECTED: "MongoDB is connected",
            ERROR: "There was an error while connecting to the database."
        },
        USER: {
            CREATED: "User created successfully",
            FETCHED: "User fetched successfully",
            FETCHEDALL: "User fetched successfully",
            UPDATED: "User updated successfully",
            DELETED: "User deleted successfully",
            DUPLICATE_ERROR: "User already exists",
            DUPLICATE_EMAIL: "Email already exists",
            INVALID_ID_ERROR: "Id doesn't exist",
            INVALID_USER_ERROR: "User doesn't exist",
            INVALID_OBJID_ERROR: "Id is not a valid objectId",
            INVALID_EMAIL_ERROR: "Invalid email or password",
            INVALID_PASSWORD_ERROR: "Invalid email or password",
            LOGGEDIN: "Login was successful",
            LOGGEDOUT: "Logout was successful"
        },
        TRANSACTION: {
            DCREATED: "Deposit created successfully",
            WCREATED: "Withdrawal created successfully",
            DFETCHED: "Deposits fetched successfully",
            WFETCHED: "Withdrawals fetched successfully",
            FETCHED: "Transactions fetched successfully",
            INSUFFICIENT: "Insufficient account balance",
            CONFIRM: {
                TRANSACTION: "Transaction has been confirmed",
                DEPOSIT: {
                    APPROVED: "Deposit has been approved",
                    REJECTED: "Deposit has been rejected"
                },
                WITHDRAWAL: {
                    APPROVED: "Withdrawal has been approved",
                    REJECTED: "Withdrawal has been rejected"
                }
            },
        }
    }
}