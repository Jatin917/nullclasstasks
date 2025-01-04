import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const authenticationPopup = async() => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken;
        return token;
    } catch (error) {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
    }
}

export const getGoogleToken = async () => {
    const user = auth.currentUser; // Get the current user
    if (user) {
        try {
            const token = await user.getIdToken(true); // Pass 'true' to force refresh the token
            return token; // Return the token
        } catch (error) {
            console.error("Error retrieving ID token:", error);
            return null; // Return null if an error occurs
        }
    }
    return null; // Return null if no user is authenticated
};

export const authenticationRedirect = async () => {
    try {
      await signInWithRedirect(auth, provider); // This starts the redirect flow
    } catch (error) {
      console.error("Error during sign-in redirect:", error);
    }
  };

export const handleRedirectResult = async() => {
    try {
        const result = await getRedirectResult(auth);
        console.log("result for redirect is ", result)
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
    
          // The signed-in user info.
          const user = result.user;
    
          // You can retrieve IdP data using getAdditionalUserInfo(result) if needed.
          console.log("User signed in:", user);
          console.log("Access Token:", token);
        } else {
          console.log("No redirect result found.");
        }
      } catch (error) {
        // Handle errors here
        console.error("Error during redirect result:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
    
        // The email of the user's account used (if available).
        const email = error.customData?.email;
    
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    
        console.error("Error details:", { errorCode, errorMessage, email, credential });
      }
}