import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon } from 'antd';

const SelectTimeline = props => {
  return (
    <Timeline mode="alternate">
      <Timeline.Item color="red" dot={<Icon type="clock-circle-o" />}>
        <p>
          <b>{props.startAt}</b>
          <b>&nbsp;开放参观</b>
        </p>
      </Timeline.Item>
      {props.selected &&
        props.selected.map(item => (
          <Timeline.Item key={item.id}>
            <p>
              {item.selectDate} {item.selectTime}
            </p>
            <p>{item.collegeName}</p>
          </Timeline.Item>
        ))}
      
      <Timeline.Item color="red" dot={<Icon type="clock-circle-o" />}>
        <p>
          <b>{props.endAt}</b>
          <b>&nbsp;关闭参观</b>
        </p>
      </Timeline.Item>
    </Timeline>
  );
};

SelectTimeline.propTypes = {
  data: PropTypes.string
};

export default SelectTimeline;
