const uuid = require("uuid");

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const Loadouts = {
  get: function() {
      return "test 1 SUCCESSFUL";
  }
};

function createLoadoutsModel() {
    const storage = Object.create(Loadouts);
    storage.posts = [];
    return storage;
}

module.exports = {Loadouts: createLoadoutsModel() };
