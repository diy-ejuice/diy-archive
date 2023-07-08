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

  const flairs = ['Recipe', 'Flavors', 'Mixing'];
  const pages = ['new', 'top', 'flair'];
  const pageCount = Math.ceil(
    result.data.allSubmissionsJson.nodes.length / subsPerPage
  );

  for (const page of pages) {
    for (let i = 1; i < pageCount; i++) {
      const context = {
        limit: subsPerPage,
        skip: i * subsPerPage
      };

      if (page === 'flair') {
        for (const flair of flairs) {
          createPage({
            context: {
              ...context,
              flair
            },
            path:
              i === 1
                ? `/${page}/${flair.toLowerCase()}`
                : `/${page}/${flair.toLowerCase()}/${i}`,
            component: resolve(`src/components/${page}Submissions.js`)
          });
        }
      } else {
        createPage({
          context,
          path: i === 1 ? `/${page}` : `/${page}/${i}`,
          component: resolve(`src/components/${page}Submissions.js`)
        });
      }
    }
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
