const router = require("express").Router();
const validate = require("../middleware/validate.middleware");
const { MemberSchema } = require("../schemas/index.schema");
const {
    register,
    updateMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
router.post("/register", validate(MemberSchema), register);
router.patch("/", updateMember);
// router.delete("/wipe/:id", wipePatient);
router.get("/all", fetchAllMember);
router.get("/:ippis", getMemberByIppis);
router.get("/id/:id", getMemberByID);

module.exports = router;