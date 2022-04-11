'use strict';
const timelogsRoutes = require('./routes/timelogs');

module.exports = (app) => {
    app.use('/timelogs', timelogsRoutes);
};