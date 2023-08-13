const router = require("express").Router();
const validate = require("../middleware/validate.middleware");
const { MemberSchema } = require("../schemas/index.schema");
const {
    register,
    updateMember,
    deleteMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
router.post("/register", validate(MemberSchema), register);
router.patch("/:ippis", updateMember);
router.delete("/:ippis", deleteMember);
router.get("/all", fetchAllMember);
router.get("/id/:id", getMemberByID);
router.get("/:ippis", getMemberByIppis);

module.exports = router;