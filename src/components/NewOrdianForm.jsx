import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Select, Button, Divider, BackTop } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

class NewOrdianForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uneditable: true,
      openUneditable: true,
      startUneditable: true,
      openValue: moment('2018-08-08 10:00'),
      closeValue: moment('2018-08-08 12:00'),
      startValue: moment('2018-08-08 08:00'),
      endValue: moment('2018-08-09 17:00'),
      options: []
    };
  }
  disabledOpenDate = openValue => {
    const closeValue = this.state.closeValue;
    if (!openValue || !closeValue) {
      return false;
    }
    return openValue.valueOf() > closeValue.valueOf();
  };
  disabledCloseDate = closeValue => {
    const openValue = this.state.openValue;
    if (!closeValue || !openValue) {
      return false;
    }
    return closeValue.valueOf() <= openValue.valueOf();
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onOpenChange = value => {
    this.onChange('openValue', value);
  };
  onCloseChange = value => {
    this.onChange('closeValue', value);
  };
  onStartChange = value => {
    this.onChange('startValue', value);
  };
  onEndChange = value => {
    this.onChange('endValue', value);
  };
  handleEditable = e => {
    this.setState({ startUneditable: false });
  };
  handleNewPage = e => {
    this.setState({
      uneditable: false,
      openUneditable: false,
      startUneditable: false,
      openValue: null,
      closeValue: null,
      startValue: null,
      endValue: null
    });
  };

  handleEndOpenChange = open => {
    let { startValue, endValue } = this.state;
    if (open || !startValue || !endValue) return;

    let today = moment(startValue.format('YYYY-MM-DD HH'));
    let options = [];

    while (moment(today).isBefore(endValue)) {
      let sh = today.date() === startValue.date() ? today.hour() : 8;
      let eh = today.date() === endValue.date() ? endValue.hour() : 18;
      let available = [8, 9, 10, 11, 14, 15, 16]; // 可接受预约时间段，17时例外
      let gap = today.day() === 5 ? 3 : 1; // 周五三连跳
      let children = [];

      while (sh < eh) {
        if (available.indexOf(sh) >= 0) {
          children = [
            ...children,
            {
              value: `${sh}:00-${sh}:20`,
              label: `${sh}:00-${sh}:20`
            },
            {
              value: `${sh}:20-${sh}:40`,
              label: `${sh}:20-${sh}:40`
            },
            {
              value: `${sh}:40-${sh}:00`,
              label: `${sh}:40-${sh + 1}:00`
            }
          ];
        } else if (sh === 17) {
          children = [
            ...children,
            {
              value: `${sh}:00-${sh}:20`,
              label: `${sh}:00-${sh}:20`
            }
          ];
        }
        sh++;
      }
      if (children.length) {
        options = [
          ...options,
          {
            value: `${today.format('YYYY-MM-DD')}`,
            label: `${today.format('YYYY年MM月DD日')}`,
            children
          }
        ];
      }

      today = today.set('date', today.get('date') + gap);
    }
    console.log(options);
    this.setState({ options });

    return startValue.format('YYYY-MM-DD');
  };

  generateSelectField = e => {
    const { options } = this.state;
    const { getFieldDecorator } = this.props.form;

    let selectFieldList = [];

    if (options.length) {
      selectFieldList = options.map((item, index) => (
        <FormItem label={item.label} key={item.value}>
          {getFieldDecorator(item.value, {
            initialValue: item.children.map(i => i.value)
          })(
            <Select mode="multiple" placeholder="Please select">
              {item.children.map(i => (
                <Option key={i.value}>{i.value}</Option>
              ))}
            </Select>
          )}
        </FormItem>
      ));
    }
    return selectFieldList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={e => this.props.handleSubmit(e, this.props.form)}>
        <BackTop />
        <FormItem {...formItemLayout} label="开放预约时间">
          {getFieldDecorator('open_at', {
            initialValue: this.state.openValue,
            rules: [
              {
                required: true,
                message: 'Please select open datetime!'
              }
            ]
          })(
            <DatePicker
              disabled={this.state.openUneditable}
              disabledDate={this.disabledOpenDate}
              showTime={{ minuteStep: 5, format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="Open"
              setFieldsValue={this.openValue}
              onChange={this.onOpenChange}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="关闭预约时间">
          {getFieldDecorator('close_at', {
            initialValue: this.state.closeValue,
            rules: [
              {
                required: true,
                message: 'Please select close datetime!'
              }
            ]
          })(
            <DatePicker
              disabled={this.state.openUneditable}
              disabledDate={this.disabledCloseDate}
              showTime={{ minuteStep: 5, format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="Close"
              setFieldsValue={this.closeValue}
              onChange={this.onCloseChange}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="开始参观时间">
          {getFieldDecorator('start_at', {
            initialValue: this.state.startValue,
            rules: [
              {
                required: true,
                message: 'Please select start datetime!'
              }
            ]
          })(
            <DatePicker
              disabled={this.state.startUneditable}
              disabledDate={this.disabledStartDate}
              showTime={{ minuteStep: 5, use12Hours: true, format: 'HH A' }}
              format="YYYY-MM-DD HH:00"
              placeholder="Start"
              setFieldsValue={this.startValue}
              onChange={this.onStartChange}
              onOpenChange={this.handleEndOpenChange}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="结束参观时间">
          {getFieldDecorator('end_at', {
            initialValue: this.state.endValue,
            rules: [
              {
                required: true,
                message: 'Please select end datetime!'
              }
            ]
          })(
            <DatePicker
              disabled={this.state.startUneditable}
              disabledDate={this.disabledEndDate}
              showTime={{ minuteStep: 5, use12Hours: true, format: 'HH A' }}
              format="YYYY-MM-DD HH:00"
              placeholder="End"
              setFieldsValue={this.endValue}
              onChange={this.onEndChange}
              onOpenChange={this.handleEndOpenChange}
            />
          )}
        </FormItem>
        <Divider />
        {this.generateSelectField()}
        <FormItem {...tailFormItemLayout}>
          {this.state.uneditable ? (
            <Button.Group>
              <Button type="primary" ghost onClick={this.handleEditable}>
                修改
              </Button>
              <Button type="primary" onClick={this.handleNewPage}>
                新增
              </Button>
            </Button.Group>
          ) : (
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          )}
        </FormItem>
      </Form>
    );
  }
}

NewOrdianForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default Form.create()(NewOrdianForm);
