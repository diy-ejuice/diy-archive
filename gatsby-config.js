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

const remarkPlugins = [
  {
    resolve: 'gatsby-remark-external-links',
    options: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 800
    }
  },
  {
    resolve: 'gatsby-remark-classes',
    options: {
      classMap: {
        table: 'table table-striped'
      }
    }
  },
  'gatsby-remark-autolink-headers',
  'gatsby-remark-numbered-footnotes'
];

module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'DIY Archive',
    author: 'ayan4m1',
    description: 'An archive of /r/DIY_eJuice.',
    siteUrl: 'https://archive.diyejuice.org/'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem-with-queue',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem-with-queue',
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
    'gatsby-plugin-eslint',
    'gatsby-plugin-image',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: remarkPlugins
      }
    }
  ]
};
