const { default: knex } = require("knex");

exports.seed = function (knext, Promise) {
  return knex("users")
    .truncate()
    .then(function () {
      return knex("users").insert([
        { username: "Harry", password: "ChosenOne" },
        { username: "Hermione", password: "BrightestWitch" },
        { username: "Ron", password: "IDontLikeSpiders" },
        { username: "Draco", password: "Pottah" },
      ]);
    });
};
