'use strict';

// Load mongoose module
const mongoose = require('mongoose');

// Define the Advert schema
const advertSchema = mongoose.Schema({
    name: String,
    for_sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});



// Model methods

/**
 * Lists an array of adverts if found.
 */
advertSchema.statics.listAll = function({ filter, skip, limit, fields, sort }) {
    const query = Advert.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
};

/**
 * Find an advert by id
 */
advertSchema.statics.getOneById = function(_id) {
    const query = Advert.findById(_id);
    return query.exec();
};

/**
 * Update an advert by his id
 */
advertSchema.statics.updateById = function(_id, data) {
    const query = Advert.findByIdAndUpdate(_id, data, { new: true });
    return query.exec();
}

/**
 * Delete an advert by his id
 */
advertSchema.statics.deleteById = function(_id) {
    const query = Advert.findByIdAndDelete(_id);
    return query.exec();
}




// Create the Advert Model
const Advert = mongoose.model('Advert', advertSchema);

// Export Advert Schema
module.exports = Advert;