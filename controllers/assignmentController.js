import Assignment from "../models/Assignment.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, description } = req.body;
    const assignment = await Assignment.create({ title, description, userId: req.user.id });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({ where: { userId: req.user.id } });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Not found" });

    if (assignment.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    assignment.status = req.body.status || assignment.status;
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
