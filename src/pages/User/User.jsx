import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../features/profile/profileSlice";
import Account from '../../components/Account/Account';
import accountsData from './../../data/accountsData.json';

export default function User() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  

 

  useEffect(() => {
    if (!user) {
      navigate("/Signin");
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user, profile, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ firstName, lastName })).then(() => {
      setIsEditing(false);
    });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;


  return (
    <main className="main bg-dark">
      <div className="header">
      {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <h1>Welcome back</h1>
            <div className="containerEditForm">              
              <div className="formRow">                
                <input
                  className="inputEditForm"
                  type="text"
                  value={firstName}
                  aria-label="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="formRow">               
                <input
                  className="inputEditForm"
                  type="text"
                  value={lastName}
                  aria-label="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="containerEditButton">
              <button type="submit">Save</button>
              <button
                type="button"
                onClick={handleCancelClick}
                >
                  Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
              <h1>Welcome back<br />
                {profile ? profile.firstName : ""}{" "}
                {profile ? profile.lastName : ""}
              </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
          )}   
      </div>
      <h2 className="sr-only">Accounts</h2>
      <div>
        {accountsData.map((account, index) => (
          <Account
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
    </div>
    </main>
  )
}
