// @flow
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Menu from '../Menu';
import MovableSidebarContent from '../MovableSidebarContent';
import Author from './Author';
import styles from './Sidebar.module.scss';

type Props = {
  +location?: Object,
};

type PureProps = Props & {
  +data: Object,
};

export const PureSidebar = ({ data, location }: PureProps) => {
  const { author } = data.site.siteMetadata;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} />
        <Menu location={location} />
        <MovableSidebarContent desktop />
      </div>
    </div>
  );
};

export const Sidebar = (props: Props) => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            author {
              name
              photo
              bio
            }
          }
        }
      }
    `}
    render={data => <PureSidebar {...props} data={data} />}
  />
);

export default Sidebar;
