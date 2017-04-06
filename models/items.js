/**
 * Created by michealin on 2/22/2017.
 */
var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    quantityPrice: Number
});
ItemsSchema.set('collection', 'items');

module.exports = mongoose.model('items', ItemsSchema);