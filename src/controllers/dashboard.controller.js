import Lead from "../models/Lead.js";

export const getDashboardMetrics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const statusAggregation = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const leadsByStatus = statusAggregation.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    const leadsOverTime = await Lead.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedOverTime = leadsOverTime.map((item) => ({
      date: item._id,
      count: item.count,
    }));

    const leadsBySource = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
    ]);

    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      summary: {
        totalLeads,
      },
      leadsByStatus,
      leadsOverTime: formattedOverTime,
      leadsBySource,
      recentLeads,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard metrics" });
  }
};
