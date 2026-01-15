import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED"],
      default: "NEW",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
