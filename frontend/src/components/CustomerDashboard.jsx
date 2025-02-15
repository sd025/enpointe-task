import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deposit, withdraw } from '../store/transactionSlice';
import { toast } from 'react-toastify';

function CustomerDashboard() {
  const dispatch = useDispatch();
  const { transactions, status, error } = useSelector((state) => state.transaction);
  const { token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchTransactions(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const currentBalance = transactions.reduce((total, tx) => {
    return tx.transaction_type.toLowerCase() === 'deposit'
      ? total + parseFloat(tx.amount)
      : total - parseFloat(tx.amount);
  }, 0);

  const handleTransaction = () => {
    const amt = parseFloat(amount);
    if (modalType === 'Withdraw' && amt > currentBalance) {
      toast.error('Insufficient Funds');
      return;
    }
    if (modalType === 'Deposit') {
      dispatch(deposit({ token, amount: amt }))
        .then(() => {
          toast.success('Deposit successful');
          dispatch(fetchTransactions(token));
        })
        .catch((err) => toast.error(err.response?.data?.error || err.message));
    } else if (modalType === 'Withdraw') {
      dispatch(withdraw({ token, amount: amt }))
        .then(() => {
          toast.success('Withdrawal successful');
          dispatch(fetchTransactions(token));
        })
        .catch((err) => toast.error(err.response?.data?.error || err.message));
    }
    setAmount('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Customer Dashboard
        </h2>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Transaction History
            </h3>
            <div className="text-lg font-medium text-gray-900">
              Balance: ${currentBalance.toFixed(2)}
            </div>
          </div>
          {status === 'loading' && (
            <p className="text-gray-600">Loading transactions...</p>
          )}
          <ul className="divide-y divide-gray-200 mb-6">
            {transactions.map((tx) => (
              <li key={tx.id} className="py-2 flex justify-between items-center">
                <span className="font-medium text-gray-800 capitalize">
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
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setModalType('Deposit');
                setShowModal(true);
              }}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition"
            >
              Deposit
            </button>
            <button
              onClick={() => {
                setModalType('Withdraw');
                setShowModal(true);
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {modalType} Funds
            </h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 mb-4"
              step="0.01"
              min="0"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTransaction}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
