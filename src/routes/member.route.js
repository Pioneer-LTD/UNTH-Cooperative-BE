const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { memberSchema, memberLoanSchema } = require("../schemas/index.schema");
const {
    register,
    updateMember,
    deleteMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
// Member CRUD Operation
router.post("/register", validate(memberSchema), register);
router.patch("/:ippis", updateMember);
router.delete("/:ippis", deleteMember);
router.get("/all", fetchAllMember);
router.get("/id/:id", getMemberByID);
router.get("/:ippis", getMemberByIppis);

module.exports = router;