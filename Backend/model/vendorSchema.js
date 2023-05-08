const Mongoose = require('mongoose');

const vendorSchema = new Mongoose.Schema(
    {
        vendorname:
        {
            type: String,
            require: true
        },
        address:
        {
            type: String,
            require: true
        },
        email:
        {
            type: String,
            require: true
        },
        vphno:
        {
            type: String,
            require: true
        }
        
    }
)

const Vendors = Mongoose.model('vendor', vendorSchema);
module.exports = Vendors;