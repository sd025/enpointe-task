import Account from '../models/accountModel.js';

const accountController = {
  getAllAccounts: (req, res) => {
    Account.getAllCustomerAccounts((err, accounts) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ accounts });
    });
  },
  getUserTransactions: (req, res) => {
    const userId = req.params.userId;
    Account.getTransactionsByUserId(userId, (err, transactions) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ transactions });
    });
  }
};

export default accountController;
