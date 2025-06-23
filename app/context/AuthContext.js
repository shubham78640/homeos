// "use client"; // This context provider will run on the client

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import {
//   onAuthStateChanged,
//   getAuth,
//   signOut
// } from "firebase/auth";
// import { getFirestore,doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
//  import { app } from '../firebase/config'; // Adjust path if necessary
//  const auth = getAuth(app);

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// const db = getFirestore(app);

// export const AuthProvider = ({ children }) => {
 
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true); // For initial authentication state
//   const [patronDetails, setPatronDetails] = useState([]); // State for patron data
//   const [patronDataLoading, setPatronDataLoading] = useState(false); // State for patron data loading
//   const [patronDataError, setPatronDataError] = useState(null); // State for patron data errors


//     useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       setLoading(false); // Auth state is determined

//       if (user && user.uid) {
//         setPatronDataLoading(true);
//         setPatronDataError(null);

//         try {
//           // ✅ Fetch document directly using user.uid as document ID
//           const docRef = doc(db, "addPatronDetails", user.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const fetchedDetails = [{ id: docSnap.id, ...docSnap.data() }];
//             setPatronDetails(fetchedDetails);
//           } else {
//             console.log("No patron details found for UID:", user.uid);
//             setPatronDetails([]);
//           }
//         } catch (err) {
//           console.error("Error fetching patron details:", err);
//           setPatronDataError("Failed to load patron details.");
//           setPatronDetails([]);
//         } finally {
//           setPatronDataLoading(false);
//         }
//       } else {
//         // No user or user has logged out
//         setPatronDetails([]);
//         setPatronDataLoading(false);
//       }
//     });

//     return () => unsubscribeAuth(); // Cleanup on unmount
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//   };
//   const value = {
//     currentUser,
//     loading, // Initial auth loading
//     patronDetails,
//     patronDataLoading,
//     patronDataError,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children} {/* Render children only after auth state is determined */}
//     </AuthContext.Provider>
//   );
// };






'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/config';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);
const db = getFirestore(app);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [patronDetails, setPatronDetails] = useState([]);
  const [patronDataLoading, setPatronDataLoading] = useState(false);
  const [patronDataError, setPatronDataError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user?.uid) {
        setPatronDataLoading(true);
        setPatronDataError(null);

        try {
          const docRef = doc(db, 'addPatronDetails', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setPatronDetails([{ id: docSnap.id, ...docSnap.data() }]);
          } else {
            console.warn(`No patron details found for UID: ${user.uid}`);
            setPatronDetails([]);
          }
        } catch (error) {
          console.error('Error fetching patron details:', error);
          setPatronDetails([]);
          setPatronDataError('Failed to load patron details.');
        } finally {
          setPatronDataLoading(false);
        }
      } else {
        setPatronDetails([]);
        setPatronDataLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  // Optional: useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({
    currentUser,
    authLoading,
    patronDetails,
    patronDataLoading,
    patronDataError,
    logout,
  }), [
    currentUser,
    authLoading,
    patronDetails,
    patronDataLoading,
    patronDataError
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
