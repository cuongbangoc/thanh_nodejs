const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        index: true,
        require: true
    },
    expiredAt: String
}, {
    collection: 'tokens',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Token', Token);