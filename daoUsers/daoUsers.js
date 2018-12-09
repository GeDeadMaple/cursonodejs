let execute = require("../Queries/executeQueries")

function getUsers() {
  let promise = new Promise((res, rej) => {
    execute.executeSelect('SELECT * FROM login').then(msg => {
	  res(msg)
    })
  })
  return promise;
}

module.exports = {
    getUsers
  };