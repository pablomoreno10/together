const CompletionLog = require('../models/completion');

const getTodoCompletionTimeline = async (req, res) => {
  try {
    const { teamId } = req.user;

    const result = await CompletionLog.aggregate([
      { $match: { teamId, completedBy: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: "$completedBy" },
      {
        $group: {
          _id: {
            year: { $year: "$updatedAt" },
            month: { $month: "$updatedAt" },
            day: { $dayOfMonth: "$updatedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: {
            $concat: [
              { $toString: "$_id.year" }, "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" }
                ]
              },"-",
              {
                $cond: [
                  { $lt: ["$_id.day", 10] },
                  { $concat: ["0", { $toString: "$_id.day" }] },
                  { $toString: "$_id.day" }
                ]
              }
            ]
          },
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error("Error in completion timeline:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTodoCompletionTimeline };
