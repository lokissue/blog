'use strict';

const path = require('path');
const _ = require('lodash');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { createRedirect } = actions;

  createRedirect({
    fromPath: '/blog',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  })

  // Tags list
  createPage({
    path: '/tags/',
    component: path.resolve('./src/templates/tags-list-template.js'),
  });

  // Archive
  createPage({
    path: '/archive/',
    component: path.resolve('./src/templates/archive-template.js'),
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              template
              prev
              next
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  _.each(edges, edge => {
    const { slug } = edge.node.fields;
    const prev = _.get(edge, 'node.frontmatter.prev');
    const next = _.get(edge, 'node.frontmatter.next');
    const template = _.get(edge, 'node.frontmatter.template');

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${template}-template.js`),
      context: { slug, prev, next},
    });
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
