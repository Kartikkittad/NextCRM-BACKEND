import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};

export const getLeads = async (req, res) => {
  const leads = await Lead.find().populate("assignedTo", "name");
  res.json(leads);
};

export const updateLeadStatus = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(lead);
};
