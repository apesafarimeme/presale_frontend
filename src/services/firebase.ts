// src/services/firebase.ts

import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  query,
  limitToLast,
  onValue,
  DataSnapshot,
  Database,
} from "firebase/database";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp | undefined;
let database: Database | undefined;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export interface Purchase {
  timestamp: number;
  cryptoSymbol: string;
  paymentAmount: string;
  tokenAmount: string;
  value: string;
}

export const addPurchase = async (purchase: Purchase) => {
  // const purchasesRef = ref(database, 'purchases');
  // await push(purchasesRef, {
  //   ...purchase,
  //   timestamp: Date.now()
  // });

  try {
    if (!database) throw new Error("Firebase database not initialized");

    const purchasesRef = ref(database, "purchases");
    await push(purchasesRef, {
      ...purchase,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error adding purchase:", error);
    throw error;
  }
};

// export const getPurchases = async () => {
//   export const subscribeToPurchases = (
//     onSuccess: (purchases: Purchase[]) => void,
//     onError?: (error: Error) => void
//   ) => {
//     try {
//       if (!database) throw new Error("Firebase database not initialized");

//       const purchasesRef = ref(database, "purchases");
//       const lastTenQuery = query(purchasesRef, limitToLast(10));

//       return onValue(
//         lastTenQuery,
//         (snapshot: DataSnapshot) => {
//           try {
//             const purchases: Purchase[] = [];
//             snapshot.forEach((childSnapshot: DataSnapshot) => {
//               purchases.push(childSnapshot.val() as Purchase);
//             });
//             onSuccess(purchases.reverse()); // Reverse to show newest first
//           } catch (error) {
//             console.error("Error processing purchase data:", error);
//             if (onError) onError(error as Error);
//           }
//         },
//         (error) => {
//           console.error("Firebase subscription error:", error);
//           if (onError) onError(error);
//         }
//       );
//     } catch (error) {
//       console.error("Error setting up Firebase subscription:", error);
//       if (onError) onError(error as Error);
//       return () => {}; // Return empty cleanup function
//     }
//   };

//   // export const subscribeToPurchases = (callback: (purchases: Purchase[]) => void) => {
//   //   const purchasesRef = ref(database, 'purchases');
//   //   const lastTenQuery = query(purchasesRef, limitToLast(10));

//   //   return onValue(lastTenQuery, (snapshot: DataSnapshot) => {
//   //     const purchases: Purchase[] = [];
//   //     snapshot.forEach((childSnapshot: DataSnapshot) => {
//   //       purchases.push(childSnapshot.val() as Purchase);
//   //     });
//   //     callback(purchases.reverse()); // Reverse to show newest first
//   //   });
//   //
// };

export const subscribeToPurchases = (
  onSuccess: (purchases: Purchase[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    if (!database) throw new Error("Firebase database not initialized");

    const purchasesRef = ref(database, "purchases");
    const lastTenQuery = query(purchasesRef, limitToLast(10));

    return onValue(
      lastTenQuery,
      (snapshot: DataSnapshot) => {
        try {
          const purchases: Purchase[] = [];
          snapshot.forEach((childSnapshot: DataSnapshot) => {
            purchases.push(childSnapshot.val() as Purchase);
          });
          onSuccess(purchases.reverse()); // Reverse to show newest first
        } catch (error) {
          console.error("Error processing purchase data:", error);
          if (onError) onError(error as Error);
        }
      },
      (error) => {
        console.error("Firebase subscription error:", error);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    console.error("Error setting up Firebase subscription:", error);
    if (onError) onError(error as Error);
    return () => {}; // Return empty cleanup function
  }
};
