import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import moment from 'moment';
import './style.scss';

const Timeout = props => {
  return (
    <Row type="flex" justify="center">
      <div className="timeout">
        <h1>系统未开放</h1>
        <p>
          <span>本次开放时间：</span>
          <span>{props.openAt && moment(props.openAt).format('YYYY/MM/DD HH:mm')}</span>
        </p>
        <p>
          <span>本次关闭时间：</span>
          <span>{props.closeAt && moment(props.closeAt).format('YYYY/MM/DD HH:mm')}</span>
        </p>
      </div>
    </Row>
  );
};

Timeout.propTypes = {
  openAt: PropTypes.string
};

export default Timeout;
