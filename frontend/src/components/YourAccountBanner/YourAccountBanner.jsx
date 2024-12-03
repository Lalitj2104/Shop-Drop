import React from "react";
import "../../components/YourAccountBanner/YourAccountBanner.css";

const AccountDetails = () => {
  return (
    <div className="account-container">
      <div className="grid">
        <div className="item">
          <h3>Digital content and devices</h3>
          <ul>
            <li>Apps and more</li>
            <li>Content Library</li>
            <li>Devices</li>
            <li>Digital gifts you've received</li>
          </ul>
        </div>
        <div className="item">
          <h3>Email alerts, messages, and ads</h3>
          <ul>
            <li>Advertising preferences</li>
            <li>Communication preferences</li>
            <li>SMS alert preferences</li>
            <li>Message Centre</li>
            <li>shopping notifications</li>
          </ul>
        </div>
        <div className="item">
          <h3>More ways to pay</h3>
          <ul>
            <li>Default Purchase Settings</li>
            <li>Shop&Drop Pay</li>
            <li>Coupons</li>
          </ul>
        </div>
        <div className="item">
          <h3>Ordering and shopping preferences</h3>
          <ul>
            <li>Leave packaging feedback</li>
            <li>Lists</li>
            <li>Manage saved IDs</li>
            <li>Profile</li>
            <li>Language settings</li>
            <li>Recalls and Product Safety Alerts</li>
          </ul>
        </div>
        <div className="item">
          <h3>Other accounts</h3>
          <ul>
            <li>Account Linking</li>
            <li>Seller account</li>
            <li>Shop&Drop Web Services</li>
          </ul>
        </div>
        <div className="item">
          <h3>Shopping programs and rentals</h3>
          <ul>
            <li>Manage Your Shop&Drop Family</li>
            <li>Subscribe & Save</li>
            <li>Shop the Kids' Store by age</li>
          </ul>
        </div>
        <div className="item">
          <h3>Subscriptions</h3>
          <ul>
            <li>Email</li>
            <li>Memberships & Subscriptions</li>
          </ul>
        </div>
        <div className="item">
          <h3>Manage your data</h3>
          <ul>
            <li>Request your data</li>
            <li>Manage apps and services with data access</li>
            <li>Close Your Amazon Account</li>
            <li>Privacy Notice</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
