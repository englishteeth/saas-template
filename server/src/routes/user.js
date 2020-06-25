const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
      name: 'Telly Hoeger',
      email: 'telly.hoeger@billy.biz'
  });
});

module.exports = router;