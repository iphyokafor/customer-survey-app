import User from '../models/userModel';

export default{
  getAllUsers: async(req, res) => {
    try {
        const getUsers = await User.find({}).sort({createdAt: -1});
        return res.json({
            success: true,
            message: 'View all users',
            getUsers
        });

    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
},
}