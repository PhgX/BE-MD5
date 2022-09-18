import { Request, Response, Router } from "express";
import Profile  from "../../model/profile";
import Post from '../../model/post';

class ProfileController {
    getProfile =  async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        console.log('userId', userId)
        let profile = await Profile.findOne({ userId: userId}).populate("userId").exec();
        console.log('profile - profile.api.ts', profile)
        if (!profile) {
        return res.status(404).json({
            message: "Profile does not exist.",
        });
        }
        let newPosts = await Post.find({ userId: userId });
        console.log(newPosts)
        res.status(200).json({
        message: "Profile fetched successfully.",
        profile,
        newPosts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "Something went wrong.",
        });
    }
    };

    updateProfile = async (req: Request, res: Response) => {
    try {
        const profileId = req.params.profileId;
        const updatedData = req.body;
        const profile = await Profile.findOneAndUpdate(
        { _id: profileId },
        { ...updatedData },
        { new: true }
        );

        res.status(200).json({
        message: "Profile updated successfully.",
        profile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "Something went wrong.",
        });
    }
    };
}


export default new ProfileController;
