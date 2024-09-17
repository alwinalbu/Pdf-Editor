const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Pdf", PdfSchema);
