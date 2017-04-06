/**
 * Created by michealin on 4/3/2017.
 */
var mongoose = require('mongoose');

var SpecialsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    adHocPrice: Number,
    saving: Number,
    items: [
        {
            name: String,
            category: String
        },
        {
            name: String,
            category: String
        }
    ]

});
SpecialsSchema.set('collection', 'specials');

module.exports = mongoose.model('specials', SpecialsSchema);