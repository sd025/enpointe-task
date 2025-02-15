import db from '../config/db.js';

const Account = {
  createTransaction: (transactionData, callback) => {
    const sql = 'INSERT INTO Accounts SET ?';
    db.query(sql, transactionData, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getTransactionsByUserId: (userId, callback) => {
    const sql = 'SELECT * FROM Accounts WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getAllCustomerAccounts: (callback) => {
    const sql = `
      SELECT u.id as user_id, u.email, u.role, 
             IFNULL(SUM(CASE WHEN a.transaction_type = 'Deposit' THEN a.amount ELSE -a.amount END), 0) as balance
      FROM Users u 
      LEFT JOIN Accounts a ON u.id = a.user_id
      WHERE u.role = 'customer'
      GROUP BY u.id
    `;
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getUserBalance: (userId, callback) => {
    const sql = `
      SELECT IFNULL(SUM(CASE WHEN transaction_type = 'Deposit' THEN amount ELSE -amount END), 0) as balance
      FROM Accounts WHERE user_id = ?
    `;
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].balance);
    });
  }
};

export default Account;
