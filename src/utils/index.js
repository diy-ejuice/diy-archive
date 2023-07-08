const countReplies = (replies) =>
  Array.isArray(replies)
    ? replies.reduce((prev, curr) => prev + countReplies(curr.replies), 1)
    : 0;

module.exports = {
  subsPerPage: 20,
  getSubmissionUrl: ({ jsonId }) => `/submission/${jsonId}`,
  countComments: ({ comments }) =>
    comments.reduce((prev, curr) => prev + countReplies(curr.replies), 1)
};
