var mongoose         = require('mongoose');

var reviewSchema = mongoose.Schema({
    name:{"type" : "String"},
    userName:{"type" : "String"},
    review:    {"type" : "String"},
    rating:       {"type": Number},

},
{ collection : 'reviews' },
);

var Review    = mongoose.model(' Review ',  reviewSchema);
module.exports = Review 
