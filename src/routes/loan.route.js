const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { isAuth } = require("../middlewares/auth.middleware")
const { memberLoanSchema, loanUpdate } = require("../schemas/index.schema");
const {
    register,
    updateLoan,
    deleteLoan,
    getMemberLoans,
    getLoanByID } = require("../controllers/loan.controller");

// member Loan accessible

router.post("/register", isAuth, validate(memberLoanSchema), register);
router.patch("/", isAuth, validate(loanUpdate), updateLoan);
router.delete("/", isAuth, deleteLoan);
router.get("/", isAuth, getMemberLoans);
router.get("/:loan_id", isAuth, getLoanByID);

module.exports = router;