const router = require("express").Router();
const memberRouter = require("./member.route");
const loanRouter = require("./loan.route");
const staffRoute = require("./staff.route");
const withdrawalRoute = require('./withdraw.route')

router.get("/docs", (req, res) => 
     res.redirect("https://documenter.getpostman.com/view/19026826/2s9Y5VSiRW") 
  );

router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Server ok' });
 });

router.use("/members", memberRouter);
router.use("/members/loans", loanRouter);
router.use('/staffs', staffRoute)
router.use('/staffs/withdrawal', withdrawalRoute)
module.exports = router;