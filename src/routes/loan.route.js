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

router.post("/regiser", isAuth, validate(memberLoanSchema), register);
router.patch("/:loan_id", isAuth, validate(loanUpdate), updateLoan);
router.delete("/:loan_id", isAuth, deleteLoan);
router.get("/", isAuth, getMemberLoans);
router.get("/:loan_id", isAuth, getLoanByID);

module.exports = router;