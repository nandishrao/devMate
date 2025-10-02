const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUser = req.user;
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({
          message: "Invalid Status Type",
        });
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection Already Exists",
        });
      }
      const isUserexists = await User.findById(toUserId);
      if (!isUserexists) {
        res.status(400).json({ message: "The User doesnt exsist" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const ToUser = await User.findById(toUserId);
      const { firstName } = ToUser;

      const data = await connectionRequest.save();
      res.json({
        message:
          fromUser.firstName + "Sent " + status + "  REQUEST to   " + firstName,
        data,
      });
    } catch (err) {
      res.send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    //request handler
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("invalid review request");
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("No Connection found");
      }
      console.log(connectionRequest);
      const { fromUserId } = connectionRequest;
      const requestRecievedBy = await User.findById({
        _id: fromUserId,
      });
      console.log(requestRecievedBy);
      const { firstName } = requestRecievedBy;
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "You accepted the request by " + firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);
module.exports = requestRouter;
