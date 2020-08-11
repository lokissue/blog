// @flow
import loadable from '@loadable/component';
import { graphql } from 'gatsby';
import * as React from 'react';
import rehypeReact from 'rehype-react';

import ContentDate from '../ContentDate';
import styles from './Content.module.scss';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
}).Compiler;

type Props = {|
  +htmlAst: Object,
  +title: string,
  +subtitle: ?string,
  +dateFormatted: string,
  +footer: ?React.Node,
|};

const Content = ({
  htmlAst,
  title,
  subtitle,
  dateFormatted,
  footer,
}: Props) => (
  <article className={styles['content']}>
    <h1 className={`${styles['content__title']} ${subtitle ? '' : styles['no-subtitle']}`}>
      {title}
    </h1>
    {subtitle && <h2 className={styles['content__subtitle']}>{subtitle}</h2>}
    <div className={styles['content__date']}>
      <ContentDate dateFormatted={dateFormatted} />
    </div>
    <div className={styles['content__spacer']} />
    <div className={styles['content__body']}>{renderAst(htmlAst)}</div>
    {footer}
  </article>
);

export const fragment = graphql`
  fragment ContentFragment on MarkdownRemark {
    htmlAst
    fields {
      ...ContentDateFragment
    }
  }
`;

export default Content;
