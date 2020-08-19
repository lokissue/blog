// @flow
import { graphql } from 'gatsby';
import * as React from 'react';

import Author from '../Author';
import Content from '../Content';
import styles from './Post.module.scss';
import ReadMore from './ReadMore';
import Tags from './Tags';

type PostType = {
  +fields: Object,
  +frontmatter: {
    +description: string,
    +img: string,
    +isML: boolean,
    +isWeb: boolean,
    +slug: string,
    +tags?: string,
    +title: string,
  },
  +htmlAst: Object,
};

type Props = {|
  +post: PostType,
  +prevPost?: PostType,
  +nextPost?: PostType,
  +contentFooter?: React.Node,
  +hideDescription?: boolean,
|};

const Post = ({ post, prevPost, nextPost, contentFooter, hideDescription }: Props) => {
  const {
    tags,
    title,
    description,
  } = post.frontmatter;
  const { dateFormatted } = post.fields;

  const { htmlAst } = post;

  return (
    <div className={styles['post']}>
      <Content
        htmlAst={htmlAst}
        title={title}
        subtitle={hideDescription ? null : description}
        dateFormatted={dateFormatted}
        footer={contentFooter}
      />

      <div className={styles['post__footer']}>
        {tags && <Tags tags={tags} tagSlugs={post.fields.tagSlugs} />}
        {prevPost && nextPost && <ReadMore prevPost={prevPost} nextPost={nextPost} />}
        <div className={styles['post__authorContainer']}>
          <Author showBio showTwitter />
        </div>
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment PostFragment on MarkdownRemark {
    ...ContentFragment
    ...ReadMoreFragment
  }
`;

export default Post;
