const mongoose = require('mongoose');

const DummyModel = new mongoose.Schema({
    ids: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
})


module.exports = mongoose.model("ExcelIds", DummyModel)