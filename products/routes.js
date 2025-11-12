const router = require('express').Router();
const ProductController = require('./controller');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);

module.exports = router;
