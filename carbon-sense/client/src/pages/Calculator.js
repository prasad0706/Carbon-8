import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCalculation } from '../features/calculation/calculationSlice';

const Calculator = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    transport: '',
    diet: '',
    waste: '',
    water: '',
  });

  const { electricity, transport, diet, waste, water } = formData;
  const dispatch = useDispatch();
  const { loading, currentCalculation, error } = useSelector((state) => state.calculation);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCalculation({ electricity, transport, diet, waste, water }));
  };

  // Calculate estimated emissions for display
  const calculateEstimate = () => {
    if (!electricity || !transport || !diet || !waste || !water) return 0;
    
    const ELECTRICITY_FACTOR = 0.45; // kg CO2 per kWh
    const TRANSPORT_FACTOR = 0.21; // kg CO2 per mile
    const DIET_FACTOR = 2.5; // kg CO2 per meal
    const WASTE_FACTOR = 0.8; // kg CO2 per kg of waste
    const WATER_FACTOR = 0.0003; // kg CO2 per liter
    
    return (
      electricity * ELECTRICITY_FACTOR +
      transport * TRANSPORT_FACTOR +
      diet * DIET_FACTOR +
      waste * WASTE_FACTOR +
      water * WATER_FACTOR
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Carbon Footprint Calculator</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                
                {currentCalculation && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong>Success!</strong> Your carbon footprint is {currentCalculation.total.toFixed(2)} kg CO2
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="electricity" className="block text-sm font-medium text-gray-700">
                      Electricity Usage (kWh/month)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="electricity"
                        id="electricity"
                        value={electricity}
                        onChange={onChange}
                        min="0"
                        step="0.1"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Average household: 900-1200 kWh/month
                    </p>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="transport" className="block text-sm font-medium text-gray-700">
                      Transport Distance (miles/month)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="transport"
                        id="transport"
                        value={transport}
                        onChange={onChange}
                        min="0"
                        step="0.1"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Average car travel: 1000-1500 miles/month
                    </p>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="diet" className="block text-sm font-medium text-gray-700">
                      Meals per Day
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="diet"
                        id="diet"
                        value={diet}
                        onChange={onChange}
                        min="0"
                        step="1"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Average: 3 meals/day
                    </p>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="waste" className="block text-sm font-medium text-gray-700">
                      Waste Generated (kg/week)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="waste"
                        id="waste"
                        value={waste}
                        onChange={onChange}
                        min="0"
                        step="0.1"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Average household: 5-10 kg/week
                    </p>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="water" className="block text-sm font-medium text-gray-700">
                      Water Usage (liters/day)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="water"
                        id="water"
                        value={water}
                        onChange={onChange}
                        min="0"
                        step="1"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Average person: 150-300 liters/day
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Estimated Footprint</h3>
                      <p className="text-sm text-gray-500">
                        Based on your inputs
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {calculateEstimate().toFixed(2)} kg CO2
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : 'Calculate Footprint'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;