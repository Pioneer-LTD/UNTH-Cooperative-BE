const router = require("express").Router();
const memberRouter = require("./member.route");
const staffRoute = require("./staff.route");

router.get("/docs", (req, res) => 
     res.redirect("https://documenter.getpostman.com/view/29089023/2s9Xy3trb3") 
  );

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server ok' });
 });

router.use("/members", memberRouter);
router.use('/staffs', staffRoute)
module.exports = router;