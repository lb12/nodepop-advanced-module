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
 * Lists distinct advert tags
 * 
 */
advertSchema.statics.getDistinctTags = function() {
    const query = Advert.distinct('tags');
    query.sort();
    return query.exec();
};

// Create the Advert Model
const Advert = mongoose.model('Advert', advertSchema);

// Export Advert Schema
module.exports = Advert;