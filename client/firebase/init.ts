import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU4cjSSSyIl6Ld8LN5onVLJlUDIL8XZ2U",
  authDomain: "olazdev-68429.firebaseapp.com",
  projectId: "olazdev-68429",
  storageBucket: "olazdev-68429.firebasestorage.app",
  messagingSenderId: "231391708832",
  appId: "1:231391708832:web:836cd24681943ff5c42bc5",
  measurementId: "G-98DVSW3HTB",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const analyticsPromise = isSupported()
  .then((v) => (v ? getAnalytics(app) : null))
  .catch(() => null);
