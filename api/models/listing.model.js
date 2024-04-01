import mongoose from "mongoose";            // Import the mongoose library

const listingSchema = new mongoose.Schema(  // Define the schema for a listing using mongoose.Schema
    {
        // Define properties or rule of the listing
        name: {
            type: String,
            requried: true,    // Ensure the name is required
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        livingrooms: {
            type: Number,
            required: true,
        },
        kitchens: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    }, 
    {timestamps: true}      // Add timestamps to track creation and modification times
);

// Create a Listing model using the listingSchema
const Listing = mongoose.model('Listing', listingSchema);
 
export default Listing; // Export the Listing model for use in other modules