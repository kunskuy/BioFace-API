import * as admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
  }
  return admin;
};

const firebaseAdmin = initializeFirebaseAdmin();
export { firebaseAdmin };
