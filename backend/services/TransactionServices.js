const axios = require("axios");
// require("dotenv").config();

const bitQueryUrl = require("../config/key").bitQueryURL;
const bitQueryApiKey = require("../config/key").bitQueryApiKey;

exports.fetchTransactions = async () => {
  const query = `
      query {
        ethereum(network: bsc) {
            transactions(options: {asc: "block.timestamp.time", limit: 10}) {
            amount(date: {since: null, till: null})
            sender(txSender: {in: "0xF6dDc8aCAFdA5BB95271CB73CFDe3AB7f67d3c99"}) {
             address
            }
             gasValue
             hash
             currency {
                symbol
                address
                name
             }
             index
            to {
            address
            smartContract {
                contractType
                currency {
                 name
                tokenType
                symbol
            }
           }
        }
        block {
        height
        timestamp {
            time
        }
        }
    }
    }
      }
    `;

  try {
    const response = await axios.post(
      bitQueryUrl,
      { query },
      { headers: { "X-API-KEY": bitQueryApiKey } }
    );

    return response.data.data.ethereum.transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};
