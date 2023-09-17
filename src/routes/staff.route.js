const Router = require('express').Router;
const { register, login, findStaff, updateStaff, findAllStaff, deleteStaff, getMyProfile
        } = require('../controllers/staff.controller');
const {isAuth} = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { staffSchema, loginStaff, staffUpdate } = require('../schemas/index.schema');
        
const router = Router();

router.post('/register', validate(staffSchema), register)
router.post('/login', validate(loginStaff), login)
router.patch('/:id', validate(staffUpdate), isAuth, updateStaff)
router.delete('/', isAuth, deleteStaff)
router.get('/', isAuth, getMyProfile)
router.get('/all/', findAllStaff)
router.get('/:id', findStaff)

module.exports = router;