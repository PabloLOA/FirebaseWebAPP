        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
        import { collection, doc, getFirestore, addDoc, getDocs, onSnapshot, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "XXXXX",
          authDomain: "XXXXX",
          projectId: "XXXXX",
          storageBucket: "XXXXX",
          messagingSenderId: "XXXXX",
          appId: "XXXXX"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getFirestore()

        export const saveMeas = (date, weight, bmi, percent) => {
            addDoc(collection(db, 'medidas'), {date, weight, bmi, percent});
        }

        export const getMeas =  () => {
            return getDocs(collection(db, 'medidas'))  
        }

        export const onGetMeas = (callback) => onSnapshot(collection(db, 'medidas'), callback )
        
        export const deleteMeas = (id) => {
          deleteDoc(doc(db, 'medidas', id));
      }

      export const getSingleMeas =  (id) => {
        return getDoc(doc(db, 'medidas', id))  
    }

    export const updateMeas =  (id, Newfields) => {
       updateDoc(doc(db, 'medidas', id), Newfields)  
  }