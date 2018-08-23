import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon, Popconfirm } from 'antd';

const SelectTimeline = props => {
  const { username } = sessionStorage;
  return (
    <Timeline mode="alternate">
      <Timeline.Item color="red" dot={<Icon type="clock-circle-o" />}>
        <span>{props.preordainAt && props.preordainAt.start_at}</span>
        <b>&nbsp;开放参观</b>
      </Timeline.Item>
      {props.selected &&
        props.selected.map(item => (
          <Timeline.Item key={item.id}>
            <span>{`${item.date} ${item.time} `}</span>
            {item.college === username ? (
              <Popconfirm
                title="要取消本时间段预约吗？"
                onConfirm={e => props.handleComfirm(item.date, item.time)}
              >
                <a>{item.college}</a>
              </Popconfirm>
            ) : (
              item.college
            )}
          </Timeline.Item>
        ))}
      <Timeline.Item color="red" dot={<Icon type="clock-circle-o" />}>
        <span>{props.preordainAt && props.preordainAt.end_at}</span>
        <b>&nbsp;关闭参观</b>
      </Timeline.Item>
    </Timeline>
  );
};

SelectTimeline.propTypes = {
  data: PropTypes.string,
  selected: PropTypes.array,
  handleComfirm: PropTypes.func.isRequired
};

export default SelectTimeline;
