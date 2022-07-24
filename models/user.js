const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), "data", "users.json");

const getUsersFromFile = (cb)=> {
  fs.readFile(p, (err, fileContent)=> {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  })
}

module.exports = class User {
  constructor(firstName, lastName, email, password)
  {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
  save() {
    this.id = Math.random().toString();
    getUsersFromFile((users) => {
      users.push(this);
      fs.writeFile(p, JSON.stringify(users), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    getUsersFromFile(cb);
  }

  static fetchUserDetails(id, cb)
  {
    getUserFromFile(products => {
      const product = products.find(p => p.id == id);
      cb(product);
    })

  }
}
