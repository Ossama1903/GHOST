import axios from "axios";

const createNewUserFromAdmin = (email, password) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({
      email,
      password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/admin/create-user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const deleteUserFromAdmin = (userId) => {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({
      userId,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/api/admin/delete-user",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export { createNewUserFromAdmin, deleteUserFromAdmin };
