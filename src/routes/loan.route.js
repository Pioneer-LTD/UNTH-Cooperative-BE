const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { memberLoanSchema,  } = require("../schemas/index.schema");
const {
    register,
    updateLoan,
    deleteLoan,
    getMembersLoan,
    getLoanByID } = require("../controllers/loan.controller");

// member Loan accessible
router.post("/regiser", validate(memberLoanSchema), register);
router.patch("/:loan_id", validate(), updateLoan);
router.delete("/:loan_id", deleteLoan);
router.get("/", getMembersLoan);
router.get("/:loan_id", getLoanByID);

module.exports = router;