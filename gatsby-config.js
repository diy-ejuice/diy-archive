require('dotenv/config');

const manifestOptions = {
  name: 'DIY Archive',
  /* eslint-disable camelcase */
  short_name: 'Archive',
  start_url: '/',
  background_color: '#4582ec',
  theme_color: '#4582ec',
  /* eslint-enable camelcase */
  display: 'minimal-ui',
  icon: 'src/images/gatsby-icon.png'
};

const gtagOptions = {
  trackingId: process.env.GA_TRACKING_ID,
  head: true,
  anonymize: true
};

module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'DIY Archive',
    author: 'ayan4m1',
    description: 'An archive of /r/DIY_eJuice.',
    siteUrl: 'https://archive.ejoose.org/'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: gtagOptions
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: { configType: 'flat' }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          quietDeps: true
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    '@ayan4m1/gatsby-plugin-root-import'
  ]
};
