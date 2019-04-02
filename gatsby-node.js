const path = require('path')
const { createPages } = require('@prismicio/gatsby-source-prismic-graphql')

exports.createPages = createPages(async ({ graphql, actions }) => {
  const { createPrismicPage } = actions

  const productHome = await graphql(`
  {
    prismic{
      allProductss(uid:null){
        edges{
          node{
            title
            meta_title
            meta_description
            _meta{
              uid
              id
              type
            }
          }
        }
      }
      allProducts{
        edges{
          node{
            _meta{
              type
              id
              uid
            }
            product_name
            product_image
            sub_title
          }
        }
      }
    }
  }
  `)
  if(productHome.errors) {
    Promise.reject(productHome.errors)
  }

  productHome.data.prismic.allProductss.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/products/`,
      component: path.resolve(`./src/templates/productsHome.js`),
      context: {
        data: node,
        extra: productHome.data.prismic.allProducts.edges
      }
    })
  })

  const blogPosts = await graphql(`
    {
      prismic{
        allBlog_posts{
          edges{
            node{
              _meta{
                uid
                id
              }
              author{
                _linkType
                ... on PRISMIC_Author{
                  name
                  bio
                  picture
                }
              }
              image
              title
              rich_content
            }
          }
        }
      }
    }
  `)
  if(blogPosts.error) {
    Promise.reject(blogPosts.error)
  }

  blogPosts.data.prismic.allBlog_posts.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/blog/:uid`,
      params: {
        uid: node._meta.uid
      },
      component: path.resolve(`./src/templates/blogPost.js`),
      context: {
        data: node
      }
    })
  })

  const blogHome = await graphql(`
    {
      prismic{
        allBlog_homes(uid:null){
          edges{
            node{
              meta_title
              _meta{
                uid
                id
                type
              }
            }
          }
        }
        allBlog_posts{
          edges{
            node{
              _meta{
                uid
                id
                type
              }
              title
              image
              rich_content        
            }
          }
        }
      }
    }
  `)
  if (blogHome.errors) {
    Promise.reject(blogHome.errors)
  }

  blogHome.data.prismic.allBlog_homes.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/blog/`,
      component: path.resolve(`./src/templates/blogHome.js`),
      context: {
        data: node,
        extra: blogHome.data.prismic.allBlog_posts.edges
      }
    })
  })

})