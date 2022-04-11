const Sequelize = require('sequelize');
const logger = require('../config/logger');
const message = require('../response_message/message');
const Timelogs = require('../models/timelogs');

const moment = require('moment')
    /**
     * insert time data
     * 
     * @body {intime,outtime} 
     */

exports.addTimeLogs = async(req, res, next) => {
    try {
        let time_logs_arry = await req.body;
        var cur1 = new Date();
        var dateString = moment(cur1).format('YYYY-MM-DD');


        for (let el of time_logs_arry) {
            var diff = new Date(dateString + " " + el.outtime).getTime() - new Date(dateString + " " + el.intime).getTime();
            var hours = Math.floor(diff / 3.6e6);
            var minutes = Math.floor((diff % 3.6e6) / 6e4);

            el.duration = hours + ":" + minutes;
        }
        console.log("time logs", time_logs_arry);
        Timelogs.bulkCreate(time_logs_arry, {
                returning: true
            }).then((data) => {
                logger.info(`Time logs  data inserted: ${JSON.stringify(data)}`);
                res.status(200)
                    .json({ status: 200, message: message.resmessage.time });
            })
            .catch(error => console.log(error))

    } catch (err) {
        if (!err.statusCode) {
            res.status(200)
                .json({ status: 401, message: err.message, data: {} })
        }
        next(err);
    }
};
//get all data
exports.postGetAllData = async(req, res, next) => {
    try {

        let get_time_logs = await Timelogs.findAll();
        res.status(200)
            .json({ status: 200, message: get_time_logs });

    } catch (err) {
        if (!err.statusCode) {
            res.status(200)
                .json({ status: 401, message: err.message, data: {} })
        }
        next(err);
    }
};

//delete data

exports.deleteTimeLogs = async(req, res, next) => {
    try {

        let id = await req.params.id;
        console.log("id =", id);
        Timelogs.destroy({
            where: { timelogs: id }
        })
        res.status(200)
            .json({ status: 200, message: message.resmessage.timedelete });

    } catch (err) {
        if (!err.statusCode) {
            res.status(200)
                .json({ status: 401, message: err.message, data: {} })
        }
        next(err);
    }
};

//time
exports.postTimeSum = async(req, res, next) => {
    try {
        let first_in = await Timelogs.findOne({
            order: [

                ['intime', 'ASC']
            ]
        });
        let last_out_time = await Timelogs.findOne({
            order: [
                ['outtime', 'DESC']

            ]
        });

        res.status(200)
            .json({ status: 200, message: { first_in: first_in.intime, last_out: last_out_time.outtime } });
    } catch (err) {
        if (!err.statusCode) {
            res.status(200)
                .json({ status: 401, message: err.message, data: {} })
        }
        next(err);
    }
}