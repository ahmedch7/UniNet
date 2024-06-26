import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("universiteAssociee");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "universiteAssociee"
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });

    if (users.length === 0) {
      return res
        .status(404)
        .send({ error: "No users found with the specified role" });
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const getUsersByRoleAndUniversity = async (req, res) => {
  try {
    const { role, universityId, niveauxEducatif } = req.params;
    const users = await User.find({
      role,
      universiteAssociee: universityId,
      niveauxEducatif,
    });

    if (users.length === 0) {
      return res
        .status(404)
        .send({
          error: "No users found with the specified role and university",
        });
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      // If an avatar file is uploaded, add its filename to the update data
      updateData.avatar = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
