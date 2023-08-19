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
    getMyProfile,
    getMemberByID,
    fetchAllMember } = require("../controllers/member.controller");
  
// Member CRUD Operation
router.post("/register", validate(memberSchema), register);
router.post("/login", validate(loginMember), login);
router.delete("/", isAuth, deleteMember);
router.patch("/", isAuth, updateMember);
router.get("/", isAuth, getMyProfile);
// router.get("/all", isAuth, fetchAllMember);
// router.get("/id/:id", isAuth, getMemberByID);
// router.get("/:ippis", isAuth, getMemberByIppis);

module.exports = router;