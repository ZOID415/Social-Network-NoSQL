const { Thought, User } = require("../models");
module.exports = {
  
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  postNewThought(req, res) {
    const {username, thoughtText, userId} = req.body;
    Thought.create({username, thoughtText})
      .then((thought) => {
        User.findOneAndUpdate(
        {_id: userId},
        {$push: {thoughts: thought._id}}
      ).then((user) => {
        res.json(thought)
      }).catch((err) => res.status(500).json(err));
    }).catch((err) => res.status(500).json(err));
  },

  // find single comment
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // update comment by id
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //remove comment by id
  removeThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then(() => res.json({ message: "Thoughts and reactions deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  // create reaction
  newReaction(req, res) {
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: "No thought found with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: "No Thought found with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};