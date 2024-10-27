'use strict';
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// import { getDatabase, ref, push, set, onValue, onChildAdded, remove, onChildRemoved } 
//     from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {
        connectStorageEmulator,
        getStorage,
        ref,
        uploadBytes,
        getDownloadURL,
      } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import  { memo_app, photo_app } from "./Constant.js";
import { firebaseConfig } from "./MyAuthkeysModules.js";
import  { getFirebaseObj, googleAuthLaterProcess } from "./GoogleFirebaseStorage.js";

const firebaseObj = getFirebaseObj(firebaseConfig);
const auth = firebaseObj.auth;

//Login成功したら下記を処理
onAuthStateChanged(auth, (user) => {

    photo_app.$input.change(()=> handleChange());
    photo_app.$form.on("submit",handleSubmit);
});


function handleChange(){
    const file = inputRef.files[0];
    console.log(file.name);
    console.log(file.type);
    console.log(file.size);
}

function handleSubmit(){
    return;
}

// viewMemoApp
function afterAuthInitDisplay(userdetail){
    memo_app.$status.fadeOut(500);
    memo_app.$uname.text(userdetail.displayName);
    memo_app.$email.text(userdetail.email);
    memo_app.$prof.attr("src",userdetail.photoURL);
}

// MemoViewer Class
function viewMemo(text){
    if(!text) return;
    memo_app.$text.val(text);
}

// Controler Class
function memoHadler(user,firebaseObj,title){
    const dbRef = getdbRef(firebaseObj.db, user.uid, title);

    onValue(dbRef, function(data){   
        let msg = data.val();    //オブジェクトデータを取得し、変数msgに代入
        viewMemo(msg.text);
    });

}

// Firebase Model Class
function setMessage(user, firebaseObj, msg){

        const dbRef = getdbRef(firebaseObj.db, user.uid, msg.title);
        set(dbRef, msg);  //DBに値をセットする
}

// Firebase Model Class
function getdbRef(db, uid, title){
    return ref( db, "users/"+ uid+"/memo/"+ title );
}



function getUserDetail(user){
  if (!user) {
      _redirect();  // User is signed out
      return;
  }
  let userdetail = {};
  if (user !== null) {
      user.providerData.forEach((profile) => {
          //Login情報取得
          userdetail = {
              displayName: profile.displayName,
              photoURL: profile.photoURL,
              providerId: profile.providerId,
              uid: profile.uid,
              email: profile.email,
              photoURL: profile.photoURL,
          }
      });
  }
  return userdetail;
}




function logOut(auth){
    // signInWithRedirect(auth, provider);
    signOut(auth).then(() => {
        // Sign-out successful.
        _redirect();
    }).catch((error) => {
        // An error happened.
        console.error(error);
    });
}


function _redirect(){
    location.href= memo_app.out_url;
}
