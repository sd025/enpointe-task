import Account from '../models/accountModel.js';

const transactionController = {
  getTransactions: (req, res) => {
    const userId = req.user.id;
    Account.getTransactionsByUserId(userId, (err, transactions) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ transactions });
    });
  },
  deposit: (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ error: 'Invalid deposit amount' });
    
    const transactionData = {
      user_id: userId,
      transaction_type: 'Deposit',
      amount,
      created_at: new Date()
    };
    
    Account.createTransaction(transactionData, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Deposit successful', transactionId: result.insertId });
    });
  },
  withdraw: (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ error: 'Invalid withdrawal amount' });
    
    Account.getUserBalance(userId, (err, balance) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (amount > balance) {
        return res.status(400).json({ error: 'Insufficient Funds' });
      }
      const transactionData = {
        user_id: userId,
        transaction_type: 'Withdraw',
        amount,
        created_at: new Date()
      };
      Account.createTransaction(transactionData, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Withdrawal successful', transactionId: result.insertId });
      });
    });
  }
};

export default transactionController;
