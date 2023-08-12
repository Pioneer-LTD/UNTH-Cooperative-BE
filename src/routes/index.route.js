const router = require("express").Router();
const memberRouter = require("./member.route");

// router.get("/docs", (req, res) => 
//   res.redirect("https://documenter.getpostman.com/view/19026826/2s93m7X2Jc") );

router.use("/members", memberRouter);

module.exports = router;