const Router = require('express').Router;
const {
register,
 login,
 findStaff,
updateStaff,
findAllStaff,
deleteStaff} = require('../controllers/staff.controller');
const {isAuth} = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { staffSchema, 
        loginStaff, 
        staffUpdate } = require('../schemas/index.schema');
        
const router = Router();


router.post('/register', validate(staffSchema), register)
router.post('/login', validate(loginStaff), login)
router.get('/:id', findStaff)
router.patch('/:id', validate(staffUpdate), isAuth, updateStaff)
router.get('/', findAllStaff)
router.delete('/:id', isAuth, deleteStaff)



module.exports = router; 

