exports.seed = function (knex) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { id: 1, username: "Harry", password: "ChosenOne" },
        { id: 2, username: "Hermione", password: "BrightestWitch" },
        { id: 3, username: "Ron", password: "IDontLikeSpiders" },
        { id: 4, username: "Draco", password: "Pottah" },
      ]);
    });
};
