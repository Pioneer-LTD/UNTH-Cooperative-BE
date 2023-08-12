const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { RegisterSchema } = require("../schemas/member.schema");
const {
    register,
    updateMember,
    deleteMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
router.post("/register", validate(RegisterSchema), register);
router.patch("/", updateMember);
router.delete("/:ippis", deleteMember);
router.get("/all", fetchAllMember);
router.get("/id/:id", getMemberByID);
router.get("/:ippis", getMemberByIppis);

module.exports = router;