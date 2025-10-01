const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        value: ["ignored", "interested", "accepted", "rejected"],
        message: ` {VALUE} is inncorrect status`,
      },
    },
  },
  {
    timestamps: true,
  }
);
const ConnectionRequestModel = mongoose.model(
  "Connection   Request",
  connectionRequestSchema
);
