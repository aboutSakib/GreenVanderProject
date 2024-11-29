const mongoose = require('mongoose');

const flashSaleSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('FlashSale', flashSaleSchema);
