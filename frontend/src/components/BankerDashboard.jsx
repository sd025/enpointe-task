import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BankerDashboard() {
  const { token } = useSelector((state) => state.auth);
  const [accounts, setAccounts] = useState([]);
  const [selectedUserTransactions, setSelectedUserTransactions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUserBalance, setSelectedUserBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/accounts', {
        headers: { Authorization: token },
      });
      setAccounts(response.data.accounts);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  // Updated to accept email and balance
  const fetchUserTransactions = async (userId, email, balance) => {
    try {
      const response = await axios.get(`/api/accounts/${userId}/transactions`, {
        headers: { Authorization: token },
      });
      setSelectedUserTransactions(response.data.transactions);
      setSelectedUserId(userId);
      setSelectedUserEmail(email);
      setSelectedUserBalance(balance);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAccounts();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Banker Dashboard
        </h2>
        {loading && (
          <p className="text-center text-gray-600">Loading accounts...</p>
        )}
        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Customer Accounts
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((acc) => (
                  <tr key={acc.user_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {acc.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {acc.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {acc.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      ${parseFloat(acc.balance).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() =>
                          fetchUserTransactions(
                            acc.user_id,
                            acc.email,
                            acc.balance
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded transition"
                      >
                        View Transactions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedUserEmail && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-gray-800">
                  Transactions for User: {selectedUserEmail}
                </h4>
                <div className="text-lg font-semibold text-gray-900">
                  Balance: ${parseFloat(selectedUserBalance).toFixed(2)}
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {selectedUserTransactions.map((tx) => (
                  <li key={tx.id} className="py-2 flex justify-between items-center">
                    <span className="text-gray-800 capitalize">
                      {tx.transaction_type}
                    </span>
                    <span className="text-gray-700">
                      ${parseFloat(tx.amount).toFixed(2)}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {new Date(tx.created_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BankerDashboard;
