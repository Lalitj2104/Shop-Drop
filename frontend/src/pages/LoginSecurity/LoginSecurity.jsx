import React, { useState } from 'react';
import '../../styles/LoginSecurity.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../redux/Actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginSecurity = () => {
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector(state=>state.userAuth);

  const editName = () => {
    // dispatch(updateUser());

  };

  const changePassword = () => {
    navigate(`/changePassword/${user?._id}`)
  };

  return (
    <>
      <Header />
      <div className="settings-container">
        <h1>Your Account - Login and Security</h1>
        <table className="settings-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{user?.firstName} {user?.lastName}</td>
              <td><button onClick={editName}>Edit</button></td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                {user?.email || <em>No email provided</em>}
                <div className="center-info">
                  For stronger account security, add your email. If there’s an unusual sign-in, we’ll email you and verify that it’s really you.
                </div>
              </td>
              <td><button>Add</button></td>
            </tr>
            <tr>
              <td>Primary mobile number</td>
              <td>
                {user?.mobile}
                <div className="center-info">
                  Quickly sign in, easily recover passwords, and receive security notifications with this mobile number.
                </div>
              </td>
              <td><button>Edit</button></td>
            </tr>
            <tr>
              <td>Passkey</td>
              <td>
                <div className="center-info">
                  Sign in the same way you unlock your device by using your face, fingerprint, or PIN.
                </div>
              </td>
              <td><button>Set up</button></td>
            </tr>
            <tr>
              <td>Password</td>
              <td>"*******</td>
              <td><button onClick={changePassword}>change</button></td>
            </tr>
            <tr>
              <td>2-step verification</td>
              <td>
                <div className="center-info">
                  Add a layer of security. Require a code in addition to your password.
                </div>
              </td>
              <td><button>Turn on</button></td>
            </tr>
            <tr>
              <td>Compromised account?</td>
              <td>
                <div className="center-info">
                  Take steps like changing your password and signing out everywhere.
                </div>
              </td>
              <td><button>Start</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default LoginSecurity;
