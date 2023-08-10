const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { RegisterSchema } = require("../schemas/member.schema");
const {
    register,
    updateMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
router.post("/register", validate(RegisterSchema), register);
router.patch("/", updateMember);
router.delete("/wipe/:id", wipePatient);
router.get("/all", fetchAllMember);
router.get("/:ippis", getMemberByIppis);
router.get("/id/:id", getMemberByID);

module.exports = router;