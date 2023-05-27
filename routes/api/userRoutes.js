const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  updateById,
  removeById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postNewUser);

router.route('/:userId').get(getSingleUser).put(updateById).delete(removeById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;