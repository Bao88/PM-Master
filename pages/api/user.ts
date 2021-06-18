import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../utilities/mongodb";
import User from "../../utilities/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { name, email } = req.body;
    console.log(name, email);
    if (name && email) {
      try {
        var user = new User({
          name,
          email,
        });
        console.log(user);
        // Create new user
        var usercreated = await user.save();
        console.log(usercreated);
        return res.status(200).send(usercreated);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
