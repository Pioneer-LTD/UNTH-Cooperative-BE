const Router = require('express').Router;
const router = Router();
const { createWithdrawal, findAllWithdrawal, findWithdrawal,
updateWithdrawal, deleteWithdrawal } = require('../controllers/withdrawal.controller')
const { withdrawalRegister} = require('../schemas/index.schema')
const validate = require('../middlewares/validate.middleware');
const {isAuth} = require('../middlewares/auth.middleware');

router.post('/', isAuth, validate(withdrawalRegister), createWithdrawal)
router.get('/:id', findWithdrawal)
router.get('/', findAllWithdrawal)
router.patch('/:id', isAuth, validate(withdrawalRegister), updateWithdrawal)
router.delete('/:id', deleteWithdrawal)

module.exports = router; 
