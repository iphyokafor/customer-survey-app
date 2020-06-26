import User from '../models/userModel';

export default{
  getAllUsers: async(req, res) => {
    try {
        const getUsers = await User.find({});
        return res.json({
            message: 'View all users',
            getUsers
        });

    } catch (err) {
        return res.json({
            message: err
        });
    }
},
}