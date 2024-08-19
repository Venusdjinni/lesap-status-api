const mongoose = require("mongoose");

const Status = mongoose.model(
    "statuses",
    new mongoose.Schema({
        content: {type: String},
        creation_date: {type: Number},
        views_count: {type: Number},
    })
);

module.exports = Status;