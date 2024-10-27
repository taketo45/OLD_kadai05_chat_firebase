

import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// import { getDatabase, ref, push, set, onValue, onChildAdded, remove, onChildRemoved } 
//     from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import {
        connectStorageEmulator,
        getStorage,
        ref,
        uploadBytes,
        getDownloadURL,
      } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

function getFirebaseObj(firebaseConfig){
    const appl = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    const firebaseObj = {
        app: appl,
        provider: provider.addScope('https://www.googleapis.com/auth/contacts.readonly'),
        auth: getAuth(),
        storage: getStorage(),
        // db: getDatabase(appl),
    }

    // return provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return firebaseObj;
}



function googleAuthLaterProcess(auth, provider,tohtml){
    //Google認証完了後の処理
    signInWithPopup(auth, provider).then((result) => {
        //Login後のページ遷移
        location.href=tohtml;  
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export { getFirebaseObj, googleAuthLaterProcess };