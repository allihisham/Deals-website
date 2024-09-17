import React from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from './assets/icons/GoogleIcon';
import SamsungIcon from './assets/icons/SamsungIcon'; // Custom Samsung icon
import HuaweiIcon from './assets/icons/HuaweiIcon'; // Custom Huawei icon
import AppleIcon from './assets/icons/AppleIcon';
import './MobileDeals.css'; // Assuming you will have styles for this component

const MobileDeals = () => {
  return (
    <div className="mobile-deals">
      <h1>Mobile Deals</h1>
      <div className="brand-grid">
        <Link to="/mobiledeals/iphone" className="brand-button">
          <AppleIcon className="brand-icon" />
          <span>iPhone</span>
        </Link>
        <Link to="/mobiledeals/samsung" className="brand-button">
          <SamsungIcon className="brand-icon" />
          <span>Samsung</span>
        </Link>
        <Link to="/mobiledeals/google" className="brand-button">
          <GoogleIcon className="brand-icon" />
          <span>Google</span>
        </Link>
        <Link to="/mobiledeals/huawei" className="brand-button">
          <HuaweiIcon className="brand-icon" />
          <span>Huawei</span>
        </Link>
        {/* Add more brand buttons here */}
      </div>
    </div>
  );
};

export default MobileDeals;