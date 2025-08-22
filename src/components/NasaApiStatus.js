"use client";

import { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export default function NasaApiStatus() {
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    async function checkApiStatus() {
      try {
        const response = await fetch('/api/cactus');
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        setStatus({
          loading: false,
          error: null,
          data: data
        });
      } catch (error) {
        console.error('Error checking NASA API status:', error);
        setStatus({
          loading: false,
          error: error.message,
          data: null
        });
      }
    }
    
    checkApiStatus();
  }, []);

  if (status.loading) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center space-x-2">
        <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
        <span className="text-gray-300">Checking NASA API status...</span>
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <span className="text-gray-300">NASA API Error: {status.error}</span>
      </div>
    );
  }

  const isUsingFallback = status.data?.fallback;
  const source = status.data?.source || 'Unknown';
  
  return (
    <div className={`bg-black/20 backdrop-blur-md border ${isUsingFallback ? 'border-yellow-500/30' : 'border-green-500/30'} rounded-xl p-4 flex items-center space-x-2`}>
      {isUsingFallback ? (
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-400" />
      )}
      <div>
        <div className="text-gray-300">
          NASA API Status: {isUsingFallback ? 'Using Fallback Data' : 'Connected'}
        </div>
        <div className="text-xs text-gray-400">
          Source: {source}
        </div>
      </div>
    </div>
  );
}