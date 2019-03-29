const { registerResolvers } = require('gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/utils/linkResolver');
 
registerResolvers(linkResolver);