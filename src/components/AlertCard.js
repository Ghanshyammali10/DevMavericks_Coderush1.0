"use client";

import React from 'react';
import { 
  AlertTriangle, 
  Zap, 
  Shield, 
  Clock, 
  MapPin, 
  AlertCircle, 
  Radio, 
  Satellite, 
  Sun, 
  Wind, 
  Navigation, 
  Info,
  Wifi
} from "lucide-react";

const AlertTypeIcon = ({ type, className = "w-5 h-5" }) => {
  const iconProps = { className };
  const typeUpper = (type || '').toUpperCase();
  
  const iconConfig = {
    'CME': {
      icon: <Sun {...iconProps} />,
      color: 'text-red-500',
      label: 'Coronal Mass Ejection'
    },
    'SOLAR_FLARE': {
      icon: <Zap {...iconProps} />,
      color: 'text-yellow-400',
      label: 'Solar Flare'
    },
    'SOLAR_RADIATION_STORM': {
      icon: <Shield {...iconProps} />,
      color: 'text-purple-400',
      label: 'Radiation Storm'
    },
    'GEOMAGNETIC_STORM': {
      icon: <Navigation {...iconProps} />,
      color: 'text-blue-400',
      label: 'Geomagnetic Storm'
    },
    'RADIO_BLACKOUT': {
      icon: <Radio {...iconProps} />,
      color: 'text-orange-400',
      label: 'Radio Blackout'
    }
  };

  const config = iconConfig[typeUpper] || {
    icon: <AlertTriangle {...iconProps} />,
    color: 'text-gray-400',
    label: 'Solar Event'
  };

  return (
    <div className="flex items-center">
      <div className={`${config.color}`}>
        {React.cloneElement(config.icon, { className: `${iconProps.className} ${config.color}` })}
      </div>
      <span className="ml-2 text-sm font-medium text-gray-300">{config.label}</span>
    </div>
  );
};

const SeverityBadge = ({ severity = 'MEDIUM' }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium border flex items-center";
  
  const severityConfig = {
    CRITICAL: {
      bg: 'bg-red-900/30',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: <AlertCircle className="w-3 h-3 mr-1" />
    },
    HIGH: {
      bg: 'bg-orange-900/20',
      border: 'border-orange-500/50',
      text: 'text-orange-400',
      icon: <AlertTriangle className="w-3 h-3 mr-1" />
    },
    MEDIUM: {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      icon: <AlertTriangle className="w-3 h-3 mr-1" />
    },
    LOW: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      icon: <Info className="w-3 h-3 mr-1" />
    }
  };

  const severityUpper = severity.toUpperCase();
  const config = severityConfig[severityUpper] || {
    bg: 'bg-gray-900/20',
    border: 'border-gray-500/50',
    text: 'text-gray-400',
    icon: <Info className="w-3 h-3 mr-1" />
  };
  
  return (
    <span className={`${baseClasses} ${config.bg} ${config.border} ${config.text}`}>
      {config.icon}
      {severityUpper}
    </span>
  );
};

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return 'Unknown';
  
  const now = new Date();
  const alertTime = new Date(timestamp);
  const diffMs = now - alertTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / (3600000 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return alertTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Skeleton Loader Component
const AlertCardSkeleton = () => (
  <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 overflow-hidden">
    <div className="animate-pulse">
      <div className="h-5 bg-gray-800/50"></div>
      <div className="p-5 space-y-4">
        <div className="h-4 bg-gray-800/50 rounded w-3/4"></div>
        <div className="h-3 bg-gray-800/50 rounded w-full"></div>
        <div className="h-3 bg-gray-800/50 rounded w-5/6"></div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
          <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
          <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
          <div className="h-3 bg-gray-800/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

const AlertCard = ({ alert, loading = false }) => {
  if (loading) {
    return <AlertCardSkeleton />;
  }
  if (!alert) return null;

  const {
    id,
    title,
    description,
    severity = 'MEDIUM',
    type,
    timestamp,
    location,
    estimatedArrival,
    speed,
    intensity,
    source,
    impactAssessment = [],
    recommendedActions = []
  } = alert;

  const severityUpper = (severity || 'MEDIUM').toUpperCase();
  const typeUpper = (type || '').toUpperCase();

  const renderDetailItem = (icon, label, value) => (
    value && (
      <div className="flex items-start space-x-2 text-sm text-gray-300">
        <div className="text-gray-400 mt-0.5">{icon}</div>
        <div>
          <div className="font-medium text-gray-400">{label}</div>
          <div className="text-white">{value}</div>
        </div>
      </div>
    )
  );

  const renderListSection = (title, items) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">{title}</h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span className="text-sm text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getHeaderColor = () => {
    const colors = {
      'CRITICAL': {
        bg: 'bg-gradient-to-r from-red-900/30 to-red-800/20',
        border: 'border-red-500/30',
        text: 'text-red-100',
        icon: 'text-red-400'
      },
      'HIGH': {
        bg: 'bg-gradient-to-r from-orange-900/30 to-orange-800/20',
        border: 'border-orange-500/30',
        text: 'text-orange-100',
        icon: 'text-orange-400'
      },
      'MEDIUM': {
        bg: 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/20',
        border: 'border-yellow-500/30',
        text: 'text-yellow-100',
        icon: 'text-yellow-400'
      },
      'LOW': {
        bg: 'bg-gradient-to-r from-blue-900/30 to-blue-800/20',
        border: 'border-blue-500/30',
        text: 'text-blue-100',
        icon: 'text-blue-400'
      }
    };

    const config = colors[severityUpper] || {
      bg: 'bg-gradient-to-r from-gray-900/30 to-gray-800/20',
      border: 'border-gray-500/30',
      text: 'text-gray-100',
      icon: 'text-gray-400'
    };

    return {
      header: `px-5 py-3 border-b ${config.border} ${config.bg} ${config.text}`,
      title: 'text-lg font-semibold',
      icon: config.icon
    };
  };

  const headerStyle = getHeaderColor();
  
  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all hover:shadow-lg hover:border-gray-600/50">
      {/* Header */}
      <div className={headerStyle.header}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={headerStyle.icon}>
              <AlertTypeIcon type={type} className="w-5 h-5" />
            </div>
            <h3 className={`${headerStyle.title} ${headerStyle.text}`}>
              {title}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-xs bg-black/20 px-2 py-1 rounded">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatTimeAgo(timestamp)}</span>
            </div>
            <SeverityBadge severity={severityUpper} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {description && <p className="text-gray-300 mb-4">{description}</p>}
        
        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {renderDetailItem(
            <MapPin className="w-4 h-4" />,
            "Location",
            location
          )}
          
          {renderDetailItem(
            <AlertTypeIcon type={type} className="w-4 h-4" />,
            "Event Type",
            typeUpper.split('_').join(' ')
          )}
          
          {speed && renderDetailItem(
            <Wind className="w-4 h-4" />,
            "Speed",
            speed
          )}
          
          {intensity && renderDetailItem(
            <Zap className="w-4 h-4" />,
            "Intensity",
            intensity
          )}
          
          {estimatedArrival && renderDetailItem(
            <Clock className="w-4 h-4" />,
            "Estimated Arrival",
            estimatedArrival
          )}
          
          {source && renderDetailItem(
            <Satellite className="w-4 h-4" />,
            "Source",
            source
          )}
        </div>

        {/* Impact Assessment */}
        {renderListSection("Impact Assessment", impactAssessment)}
        
        {/* Recommended Actions */}
        {renderListSection("Recommended Actions", recommendedActions)}
      </div>
      
      {/* Footer */}
      <div className="px-5 py-2.5 bg-gray-800/30 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <div className="flex items-center text-gray-400">
            <span className="hidden sm:inline-flex items-center mr-2">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-mono">{id || 'N/A'}</span>
            </span>
            {source && (
              <span className="inline-flex items-center">
                <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-gray-500">{source.split(',')[0].trim()}</span>
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last updated: {timestamp ? new Date(timestamp).toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
