const express = require('express');
const timeController = require('../controllers/timelogsController');

const router = express.Router();

router.post('/v1/add', timeController.addTimeLogs); // save data (bulk add)
router.post('/v1/getdata', timeController.postGetAllData); // get data
router.delete('/v1/delete/:id', timeController.deleteTimeLogs); //delete time logs
router.post("/v1/time", timeController.postTimeSum); //time 

module.exports = router;