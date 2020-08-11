// @flow
import { graphql } from 'gatsby';
import React from 'react';

import styles from './ContentDate.module.scss';

type Props = {|
  +dateFormatted: string,
|};

const ContentDate = ({ dateFormatted}: Props) => (
  <p className={styles['content-date']}>
    <time>{dateFormatted}</time>
    )}
  </p>
);

export const fragment = graphql`
  fragment ContentDateFragment on MarkdownRemarkFields {
    dateFormatted
  }
`;

export default ContentDate;
