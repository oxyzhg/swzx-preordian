import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Footer } = Layout;

const PageFooter = props => {
  return (
    <Footer className="page__ft">
      <div>
        <a href="//www.youthol.cn">Youthol</a>
        <span> © {props.year} All rights reserved.</span>
      </div>
    </Footer>
  );
};

PageFooter.propTypes = {
  year: PropTypes.string.isRequired
};

export default PageFooter;
