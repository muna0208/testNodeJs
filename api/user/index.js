const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

// app.use('/users', user); 경로 설정이 되어있어서 /users는 생략해도 된다.
router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;