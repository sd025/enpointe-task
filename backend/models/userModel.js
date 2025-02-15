import db from '../config/db.js';

const User = {
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
  findById: (id, callback) => {
    const sql = 'SELECT * FROM Users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
  create: (userData, callback) => {
    const sql = 'INSERT INTO Users SET ?';
    db.query(sql, userData, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

export default User;
