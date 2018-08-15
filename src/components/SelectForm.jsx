import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Cascader } from 'antd';

const FormItem = Form.Item;

const SelectForm = props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={props.handleSubmit} className="login-form">
      <FormItem>
        {getFieldDecorator('preordian', {
          initialValue: ['21日下午', '14:00-14:20'],
          rules: [{ required: true, message: '参观时间段不能为空!' }]
        })(
          <Cascader
            placeholder="请选择参观时间段"
            options={props.options}
            // option={{ initialValue: ['21日下午', '14:00-14:20'] }}
            // initialValue={['21日下午', '14:00-14:20']}
            onChange={props.handleChange}
          />
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          提交
        </Button>
      </FormItem>
    </Form>
  );
};

SelectForm.propTypes = {
  form: PropTypes.object,
  data: PropTypes.string
};

export default SelectForm;
