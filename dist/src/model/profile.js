"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    website: String,
    location: {
        type: String,
        default: "The Universe",
    },
    bio: { type: String, default: "This is bio." },
    dob: {
        type: Date,
    },
    profileImageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1662927204499-cbe4b5879f78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    backgroundImageUrl: {
        type: String,
        default: "https://images.unsplash.com/photo-1592527238461-1ee9001b3b4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    }
});
const Profile = (0, mongoose_1.model)('Profiles', profileSchema);
exports.default = Profile;
