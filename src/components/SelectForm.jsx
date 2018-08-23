import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Cascader } from 'antd';

const FormItem = Form.Item;

const SelectForm = props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={e => props.handleSubmit(e, props.form)} className="login-form">
      <FormItem>
        {getFieldDecorator('preordain', {
          initialValue: props.defaultValue,
          rules: [{ required: true, message: '参观时间段不能为空!' }]
        })(<Cascader placeholder="请选择参观时间段" options={props.options} />)}
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

export default Form.create()(SelectForm);
