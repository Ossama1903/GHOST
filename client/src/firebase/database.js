import { getDatabase, set, ref, push } from "firebase/database";
import { app } from "./firebase";
import authentication from "./authentication";

const db = getDatabase(app, "https://ghost-e4544-default-rtdb.firebaseio.com/");

class Database {
  constructor(passedInstance) {
    this.databaseInstance = passedInstance;
  }
  async createNewUser(
    userId,
    email,
    password,
    firstName,
    lastName,
    role,
    image,
    gender,
    dateOfBirth
  ) {
    try {
      const { user } = await authentication.registerWithEmailAndPassword(
        email,
        password
      );
      await set(ref(this.databaseInstance, `users/${user.uid}`), {
        email,
        firstName,
        lastName,
        role,
        image,
        gender,
        dateOfBirth,
      });
    } catch {
      console.log("Couldn't register");
    }
  }

  async createNewAlert(time, userId, rideId, isApproved) {
    await push(ref(db, `alerts`), {
      userId,
      rideId,
      time,
      isApproved,
    });
  }
}

const database = new Database(db);

export default database;
