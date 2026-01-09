import React, { useState } from 'react';
import { testGroqConnection } from '../lib/groq-service';

export const GroqTest: React.FC = () => {
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await testGroqConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Groq API Test</h1>
        
        <button
          onClick={runTest}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Testing...' : 'Test Groq Connection'}
        </button>

        {testResult && (
          <div className={`mt-6 p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {testResult.message}
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-2">What this test does:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Verifies your Groq API key is valid</li>
            <li>Sends a test message: "Hello!"</li>
            <li>Receives an AI-generated response</li>
            <li>Displays the result</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
