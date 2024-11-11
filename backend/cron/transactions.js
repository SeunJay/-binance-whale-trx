const cron = require("node-cron");

const scheduleTransactionJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    // every 5 minutes
    try {
      const transactions = await TransactionServices.fetchTransactions();

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  });
};

module.exports = scheduleTransactionJob;
