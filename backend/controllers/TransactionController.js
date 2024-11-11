const TransactionServices = require("../services/TransactionServices");

exports.fetchTransactions = async (req, res) => {
  try {
    const transactions = await TransactionServices.fetchTransactions();

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
