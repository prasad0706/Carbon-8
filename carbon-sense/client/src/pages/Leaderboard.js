import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderboard, getUserRank } from '../features/leaderboard/leaderboardSlice';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard, userRank, loading, error } = useSelector((state) => state.leaderboard);
  const { userInfo } = useSelector((state) => state.auth);
  const [period, setPeriod] = useState('monthly'); // 'monthly', 'yearly', 'all-time'

  useEffect(() => {
    dispatch(getLeaderboard(period));
    dispatch(getUserRank(period));
  }, [dispatch, period]);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Community Leaderboard</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Top Contributors
                </h3>
                <div className="mt-3 sm:mt-0">
                  <nav className="flex space-x-4" aria-label="Tabs">
                    <button
                      onClick={() => handlePeriodChange('monthly')}
                      className={`${
                        period === 'monthly'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-500 hover:text-gray-700'
                      } px-3 py-2 font-medium text-sm rounded-md`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => handlePeriodChange('yearly')}
                      className={`${
                        period === 'yearly'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-500 hover:text-gray-700'
                      } px-3 py-2 font-medium text-sm rounded-md`}
                    >
                      Yearly
                    </button>
                    <button
                      onClick={() => handlePeriodChange('all-time')}
                      className={`${
                        period === 'all-time'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-500 hover:text-gray-700'
                      } px-3 py-2 font-medium text-sm rounded-md`}
                    >
                      All Time
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="border-t border-gray-200">
                {userRank && userRank.rank && (
                  <div className="bg-green-50 px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {userRank.rank}
                        </span>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-900">
                            Your Rank: #{userRank.rank}
                          </p>
                          <p className="text-sm text-green-700">
                            Score: {Math.abs(userRank.score).toFixed(2)} kg CO2 saved
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-green-700">
                        {userInfo?.name}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard && leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                          <tr key={entry._id} className={entry.userId._id === userInfo?._id ? 'bg-green-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                  index === 0 ? 'bg-yellow-400' : 
                                  index === 1 ? 'bg-gray-400' : 
                                  index === 2 ? 'bg-yellow-600' : 
                                  'bg-green-500'
                                }`}>
                                  {entry.rank}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {entry.userId.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {Math.abs(entry.score).toFixed(2)} kg CO2
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                            No leaderboard data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm text-gray-500">
                    <p>
                      <span className="font-medium">How it works:</span> Lower carbon footprint = higher rank. 
                      The leaderboard shows users who have made the most significant reductions in their carbon emissions.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;