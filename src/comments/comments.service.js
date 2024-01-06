const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*");
}

function listCommenterCount() {
  // your solution here
  // !! count() return value is string type. Use raw() to convert string to number.
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .select("u.user_email as commenter_email", knex.raw("count('c.comment') :: integer"))
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  // your solution here
  return knex("comments as c")
    .select("comment_id", "comment", "user_email as commenter_email", "post_body as commented_post")
    .where("comment_id", commentId)
    .join("users", "commenter_id", "user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .first(); // !!Must use first(). Would return 'undefined' when a comment by the given id not exist.
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
