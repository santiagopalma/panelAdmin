import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import 'firebase/database';


import firebaseConfig from './config';

class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }
        this.db = app.firestore()
        this.storage = app.storage();
        this.databa = app.database();
    }
}


const firebase = new Firebase();
export default firebase;
