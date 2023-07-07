const { resolve } = require('path');
const { subsPerPage, getSubmissionUrl } = require('./src/utils');

const createSubmissionPages = async ({ actions, graphql, reporter }) => {
  const component = resolve(`src/components/submission.js`);
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allSubmissionsJson {
        nodes {
          jsonId
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  let counter = 0;

  result.data.allSubmissionsJson.nodes.forEach((node) => {
    const path = getSubmissionUrl(node);

    reporter.info(`Created page for ${path}`);
    counter++;
    createPage({
      context: node,
      component,
      path
    });
  });

  reporter.info(`Created ${counter} submission pages!`);
};

const createSubmissionListPages = async ({ actions, graphql, reporter }) => {
  const component = resolve(`src/components/submissionList.js`);
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allSubmissionsJson {
        nodes {
          jsonId
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const pageCount = Math.ceil(
    result.data.allSubmissionsJson.nodes.length / subsPerPage
  );

  for (let i = 1; i < pageCount; i++) {
    createPage({
      context: {
        limit: subsPerPage,
        skip: i * subsPerPage
      },
      path: `/new/${i}`,
      component
    });
  }

  reporter.info(`Created ${pageCount} submission list pages!`);
};

exports.createPages = async (options) => {
  await createSubmissionPages(options);
  await createSubmissionListPages(options);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules']
    }
  });
};
