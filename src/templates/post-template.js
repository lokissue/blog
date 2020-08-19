// @flow
import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import FixedScrollContainer from '../components/FixedScrollContainer';
import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import Post from '../components/Post';
import TemplateWrapper from '../components/TemplateWrapper';

type Props = {|
  +data: Object,
  +pageContext: Object,
|};

const PostTemplate = ({ data, pageContext }: Props) => {
  const { author, title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = data.site.siteMetadata;
  const { edges } = data.allMarkdownRemark;
  const { slug, prev, next } = pageContext;
  const [slugNode, prevNode, nextNode] = [slug, prev, next].map(
    s => edges.filter(e => e.node.frontmatter.slug === s)[0].node
  );

  const {
    category,
    date,
    img: imgUrl,
    title: postTitle,
    description,
  } = slugNode.frontmatter;

  const wordCount = slugNode.fields.readingTime.words;

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) {
      return;
    }

    const listener = () => setHasScrolled(true);
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [hasScrolled, setHasScrolled]);

  return (
    <TemplateWrapper>
      <NavHeader />
      <Layout
        title={`${postTitle} - ${siteTitle}`}
        description={description || siteSubtitle}
      >
        <Helmet>
          <meta property="og:type" content="article" />
          <meta property="og:image" content={imgUrl} />
          <script type="application/ld+json">
            {`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "image": "${imgUrl}",
  "url": "${siteUrl + slug}",
  "headline": "${postTitle}",
  "description": "${description}",
  "wordcount": "${wordCount}",
  "dateCreated": "${date}",
  "datePublished": "${date}",
  "dateModified": "${date}",
  "inLanguage": "en-US",
  "mainEntityOfPage": "True",
  "articleBody": "${slugNode.excerpt}",
  "articleSection": "${category}",
  "author": {
    "@type": "Person",
    "name": "${author.name}",
    "url": "${siteUrl}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${author.name}",
    "url": "${siteUrl}",
    "logo": {
      "@type": "ImageObject",
      "url": "${siteUrl}${author.photoLarge}",
      "width": "1024",
      "height": "1024"
    }
  }
}`}
          </script>
        </Helmet>
        <Post post={slugNode} prevPost={prevNode} nextPost={nextNode} />
      </Layout>
      {hasScrolled && (
        <>
          {/* <ShareIcons url={slug} title={postTitle} /> */}
          <FixedScrollContainer>
            <div/>
          </FixedScrollContainer>
        </>
      )}
    </TemplateWrapper>
  );
};

export const fragment = graphql`
  fragment PostTemplateFragment on Query {
    site {
      siteMetadata {
        author {
          name
          photoLarge
        }
        url
        subtitle
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { slug: { in: [$slug, $prev, $next] } } }) {
      edges {
        node {
          ...PostFragment
          excerpt(pruneLength: 5000)
          fields {
            tagSlugs
            readingTime {
              words
            }
          }
          frontmatter {
            category
            description
            img
            tags
            title
          }
        }
      }
    }
  }
`;

export const query = graphql`
  query PostBySlug($slug: String!, $prev: String, $next: String) {
    ...PostTemplateFragment
  }
`;

export default PostTemplate;
