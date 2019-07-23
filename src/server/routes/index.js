const path = require('path');
const router = require('express').Router();
const express = require('express');

const distPath = path.resolve('dist');
router.get('*', express.static(path.join(distPath, 'frontend')));
router.get('/calendar', (req, res) => {
  res.json({ result: 200 });
})

module.exports = router;