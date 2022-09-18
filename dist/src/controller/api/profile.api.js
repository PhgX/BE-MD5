"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = __importDefault(require("../../model/profile"));
const post_1 = __importDefault(require("../../model/post"));
class ProfileController {
    constructor() {
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                console.log('userId', userId);
                let profile = yield profile_1.default.findOne({ userId: userId }).populate("userId").exec();
                console.log('profile - profile.api.ts', profile);
                if (!profile) {
                    return res.status(404).json({
                        message: "Profile does not exist.",
                    });
                }
                let newPosts = yield post_1.default.find({ userId: userId });
                console.log(newPosts);
                res.status(200).json({
                    message: "Profile fetched successfully.",
                    profile,
                    newPosts
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Something went wrong.",
                });
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = req.params.profileId;
                const updatedData = req.body;
                const profile = yield profile_1.default.findOneAndUpdate({ _id: profileId }, Object.assign({}, updatedData), { new: true });
                res.status(200).json({
                    message: "Profile updated successfully.",
                    profile,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Something went wrong.",
                });
            }
        });
    }
}
exports.default = new ProfileController;
