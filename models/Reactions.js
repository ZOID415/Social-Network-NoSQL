const { Schema, Types } = require('mongoose');

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) { return date.toISOString().split('T')[0] };
      }
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;