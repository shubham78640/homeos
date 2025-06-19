// 'use client';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, getAuth,signOut  } from 'firebase/auth';
// import { app } from '../firebase/config'; // adjust path if needed

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// app/contexts/AuthContext.js

"use client"; // This context provider will run on the client

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  signOut
} from "firebase/auth";
import { getFirestore,doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
// import { auth, db } from '../firebase/config';
 import { app } from '../firebase/config'; // Adjust path if necessary
 const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
const db = getFirestore(app);

export const AuthProvider = ({ children }) => {
 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial authentication state
  const [patronDetails, setPatronDetails] = useState([]); // State for patron data
  const [patronDataLoading, setPatronDataLoading] = useState(false); // State for patron data loading
  const [patronDataError, setPatronDataError] = useState(null); // State for patron data errors

  // useEffect(() => {
  //   const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
  //     setCurrentUser(user);
  //     setLoading(false); // Auth state determined

  //     if (user && user.uid) {
  //       setPatronDataLoading(true);
  //       setPatronDataError(null);
  //       // try {
  //       //   // Fetch patron details based on the authenticated user's email
  //       //   // Remember: Your Firestore Security Rules MUST allow this read.
  //       //   // Rule: allow read: if request.auth != null && request.auth.token.email == resource.data.email;
  //       //   const q = query(
  //       //     collection(db, "addPatronDetails"),
  //       //     where("email1", "==", user.email)
  //       //   );
  //       //   const querySnapshot = await getDocs(q);
  //       //   const fetchedDetails = querySnapshot.docs.map(doc => ({
  //       //     id: doc.id,
  //       //     ...doc.data()
  //       //   }));
  //       //  // console.log("jsdhw5678",fetchedDetails)
  //       //   setPatronDetails(fetchedDetails);
  //       //   //console.log("jsdhw",fetchedDetails)
  //       // } 

  //          try {
  //         // Fetch patron details based on the authenticated user's email
  //         // Remember: Your Firestore Security Rules MUST allow this read.
  //         // Rule: allow read: if request.auth != null && request.auth.token.email == resource.data.email;
  //         const q = query(
  //           collection(db, "addPatronDetails"),
  //           where("id", "==", user.uid)
  //         );
  //         const querySnapshot = await getDocs(q);
  //         const fetchedDetails = querySnapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data()
  //         }));
  //        // console.log("jsdhw5678",fetchedDetails)
  //         setPatronDetails(fetchedDetails);
  //         console.log("jsdhw",user.uid)

  //       } 
        
  //       catch (err) {
  //         console.error("Error fetching patron details in AuthContext:", err);
  //         setPatronDataError("Failed to load patron details.");
  //         setPatronDetails([]); // Clear data on error
  //       } finally {
  //         setPatronDataLoading(false);
  //       }
  //     } else {
  //       // If no user, or user has no email, clear patron details
  //       setPatronDetails([]);
  //       setPatronDataLoading(false);
  //     }
  //   });

  //   return () => unsubscribeAuth(); // Cleanup auth subscription on unmount
  // }, []); // Empty dependency array means this runs once on mount



    useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false); // Auth state is determined

      if (user && user.uid) {
        setPatronDataLoading(true);
        setPatronDataError(null);

        try {
          // ✅ Fetch document directly using user.uid as document ID
          const docRef = doc(db, "addPatronDetails", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fetchedDetails = [{ id: docSnap.id, ...docSnap.data() }];
            setPatronDetails(fetchedDetails);
          } else {
            console.log("No patron details found for UID:", user.uid);
            setPatronDetails([]);
          }
        } catch (err) {
          console.error("Error fetching patron details:", err);
          setPatronDataError("Failed to load patron details.");
          setPatronDetails([]);
        } finally {
          setPatronDataLoading(false);
        }
      } else {
        // No user or user has logged out
        setPatronDetails([]);
        setPatronDataLoading(false);
      }
    });

    return () => unsubscribeAuth(); // Cleanup on unmount
  }, []);

  const logout = async () => {
    await signOut(auth);
  };
  const value = {
    currentUser,
    loading, // Initial auth loading
    patronDetails,
    patronDataLoading,
    patronDataError,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after auth state is determined */}
    </AuthContext.Provider>
  );
};