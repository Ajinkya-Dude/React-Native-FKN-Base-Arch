import { useEffect } from 'react';
import Realm from 'realm';

export const createAgenda = (data:any,realm:any) => {
    try {
         realm.write(() => {
          for (const item of data) {
            realm.create('agenda', item);
          }
        })
        return 1
    } catch (error) {
        console.log("createAgenda error",error);
        return 0
    }
};
