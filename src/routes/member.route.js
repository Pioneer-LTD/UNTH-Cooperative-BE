const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const { isAuth } = require("../middlewares/auth.middleware")
const { memberSchema, loginMember } = require("../schemas/index.schema");
const {
    register,
    login,
    updateMember,
    deleteMember,
    getMemberByIppis,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
// Member CRUD Operation
router.post("/register", validate(memberSchema), register);
router.post("/login", validate(loginMember), login);
router.patch("/:ippis", isAuth, updateMember);
router.delete("/:ippis", isAuth, deleteMember);
router.get("/all", isAuth, fetchAllMember);
router.get("/id/:id", isAuth, getMemberByID);
router.get("/:ippis", isAuth, getMemberByIppis);

module.exports = router;