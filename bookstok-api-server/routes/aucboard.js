var express = require('express');
var router = express.Router();

const user = require('../models/aucboard.model');

// 경매 목록 조회 [get] ip:12345/api/auctions/
router.get('/', async (req, res, next) => {
  try{
    const list = await user.find();
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매등록  [post] ip:12345/api/auctions/
router.post('/', async (req, res, next) => {
  try{
    const id = await user.create(req.body);
    res.json({ id });
  }catch(err){
    next(err);
  }
});



module.exports = router;
