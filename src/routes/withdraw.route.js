const Router = require('express').Router;
const router = Router();
const { createWithdrawal, findAllWithdrawal, findWithdrawal,
updateWithdrawal, deleteWithdrawal } = require('../controllers/withdrawal.controller')
const { withdrawalRegister, withdrawalUpdate} = require('../schemas/index.schema')
const validate = require('../middlewares/validate.middleware');
const {isAuth} = require('../middlewares/auth.middleware');

router.post('/', isAuth, validate(withdrawalRegister), createWithdrawal)
router.get('/all', findAllWithdrawal)
router.get('/:id', findWithdrawal)
router.patch('/:id', isAuth, validate(withdrawalUpdate), updateWithdrawal)
router.delete('/:id', deleteWithdrawal)

module.exports = router; 
