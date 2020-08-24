const UsersService = {
  getAllUsers(db) {
    return db.select("*").from("users");
  },

  getById(db, id) {
    return UsersService.getAllUsers(db).where("id", id).first();
  },
};

module.exports = UsersService;
