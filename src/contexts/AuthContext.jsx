import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGoogle,
  signInWithLinkedIn,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  signOut
} from '../config/firebase';
import { userService } from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser && isSubscribed) {
          // Set user immediately so auth isn't blocked by Supabase sync
          setUser(firebaseUser);

          // Sync user to Supabase (non-blocking)
          try {
            await userService.syncUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              provider: firebaseUser.providerData[0]?.providerId
            });
          } catch (syncErr) {
            console.warn('Supabase sync failed (non-blocking):', syncErr.message);
          }
        } else if (isSubscribed) {
          setUser(null);
        }
      } catch (err) {
        console.error('Error in auth state change:', err);
        if (isSubscribed) {
          setError(err.message);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithGoogle();
      // Sync user to backend
      if (result?.user) {
        await userService.syncUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          provider: result.user.providerData[0]?.providerId
        });
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      setError(null);
      const result = await signInWithLinkedIn();
      if (result?.user) {
        await userService.syncUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          provider: result.user.providerData[0]?.providerId
        });
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmail(email, password);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signupWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await signUpWithEmail(email, password, displayName);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithLinkedIn,
    loginWithEmail,
    signupWithEmail,
    forgotPassword,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
