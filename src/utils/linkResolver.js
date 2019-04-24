exports.linkResolver = function linkResolver(doc) {
// Link Resolver is the same as in any other Prismic project
  if (doc.type === 'homepage') {
    return '/';
  }
  if (doc.type === 'products') {
    return '/products';
  }
  if (doc.type === 'product') {
    return '/products/' + doc.uid;
  }
  if (doc.type === 'blog_home') {
    return '/blog';
  }
  if (doc.type === 'blog_post') {
    return '/blog/' + doc.uid;
  }
  return '/';
}