const Router = require('express');
const register = require('../controllers/auth');
const router = Router();

router.post('/register', register.register);
module.exports = router;