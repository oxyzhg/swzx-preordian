import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import './layout.css';

const { Header } = Layout;

const PageHeader = props => {
  return (
    <Header className="page__hd">
      <h3>{props.title}</h3>
    </Header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeader;
