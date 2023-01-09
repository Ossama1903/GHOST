import {
  getDatabase,
  set,
  ref,
  push,
  onValue,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { app } from "./firebase";

export const db = getDatabase(
  app,
  "https://ghost-e4544-default-rtdb.firebaseio.com/"
);

class Database {
  constructor(passedInstance) {
    this.databaseInstance = passedInstance;
  }

  async createNewAlert(time, userId, rideId, isApproved) {
    await push(ref(db, `alerts`), {
      userId,
      rideId,
      time,
      isApproved,
    });
  }

  getUserById(id, callback) {
    const userRef = query(ref(this.databaseInstance, `users/${id}`));
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) {
        callback(snapshot.val());
      } else callback(null);
    });
  }

  getUsersByRole(role, callback) {
    const userRef = query(
      ref(this.databaseInstance, `users`),
      orderByChild("role"),
      equalTo(role)
    );
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) {
        const arrayToReturn = [];
        for (var user in snapshot.val()) {
          arrayToReturn.push({ ...snapshot.val()[user], id: user });
        }
        callback(arrayToReturn);
      } else console.log("Couldn't find any users with the specified role");
    });
  }

  getBugs(callback) {
    const alertRef = query(ref(this.databaseInstance, `Bugs`));
    onValue(alertRef, (snapshot) => {
      const arrayToReturn = [];
      if (snapshot.val()) {
        for (var alert in snapshot.val()) {
          arrayToReturn.push({ ...snapshot.val()[alert], id: alert });
        }
        callback(arrayToReturn);
      } else {
        callback(arrayToReturn);
      }
    });
  }

  async updateBugStatus(id, status) {
    await set(ref(db, `Bugs/${id}/Status`), status);
  }

  async updateUserFlag(id, flag) {
    await set(ref(db, `users/${id}/isFlagged`), flag);
  }

  updateUsersState(setUsers) {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      var arrayToReturn = [];
      for (const property in data) {
        arrayToReturn.push({ id: property, ...data[property] });
      }
      setUsers(arrayToReturn);
    });
  }
}

const database = new Database(db);

export default database;
