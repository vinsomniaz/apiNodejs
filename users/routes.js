const router = require('express').Router();
const UserController = require('./controller');
const isAuthenticated = require('../common/middlewares/IsAuthenticated');
const checkPermission = require('../common/middlewares/CheckPermission');

router.get('/', isAuthenticated, checkPermission(['ADMIN']), UserController.getAll);
router.get('/:id', isAuthenticated, UserController.getById);

module.exports = router;
