const countReplies = ({ replies }, count = 0) =>
  count + countReplies(replies, count);

module.exports = {
  subsPerPage: 20,
  getSubmissionUrl: ({ jsonId }) => `/submission/${jsonId}`,
  countComments: ({ comments }) => comments.length + countReplies(comments)
};
