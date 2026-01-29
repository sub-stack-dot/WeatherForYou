const mongoose = require("mongoose");

const SearchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    searchDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
