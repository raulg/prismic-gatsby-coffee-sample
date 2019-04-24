const { apiEndpoint } = require('./prismic-configuration');
var repo = /([^\/]+)\.prismic\.io\/graphql/.exec(apiEndpoint);

module.exports = {
  siteMetadata: {
    title: `Coffee Shop Demo`,
    description: `Gatsby + Prismic!`,
    author: `@raulg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: repo[1], // Loads the repo name from prismic configuration
        path: '/preview',
        previews: true,
        //accessToken: '...',
        pages: [{
          type: 'Product',
          match: '/products/:uid',
          path: '/product',
          component: require.resolve('./src/templates/product.js')
        },{
          type: 'Blog_post',
          match: '/blog/:uid',
          path: '/blogpost', // Important that this is different from other generated pages, so not '/blog'
          component: require.resolve('./src/templates/blogPost.js')
        }]
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
