/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Spots from 'components/spots';
import './index.less';

interface FormProps extends FormComponentProps {
  [propName: string]: any; // 要传进来的属性
}

function ApiCreate(props: any) {
  const formItemLayout = {
    // labelCol: {
    //   xs: { span: 2 },
    //   sm: { span: 3 },
    // },
    // wrapperCol: {
    //   xs: { span: 4 },
    //   sm: { span: 6 },
    // },
    // colon: false,
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, fieldsValue: any) => {
      if (!err) {
        console.log(fieldsValue);
        // const { baseUrl, desc, name, proxyUrl } = fieldsValue;
        // const param: Partial<api> = {
        //   baseUrl: `/${baseUrl}`,
        //   desc: desc || name,
        //   name,
        //   proxy: {
        //     proxyUrl: proxyUrl ? `http://${proxyUrl}` : '',
        //   },
        // };
        // try {
        //   const rs = await apiCreate(param);
        //   if (rs) {
        //     message.success('项目创建成功');
        //     props.history.push('/');
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="api-create">
      <div className="api-create-header">
        <Spots />
        <div className="header-info">
          <h2>创建接口</h2>
          <p>快来创建一个令人愉快的接口吧～</p>
        </div>
      </div>
      <div className="api-create-content">
        <Form
          layout="vertical"
          onSubmit={handleSubmit}
          {...formItemLayout}
          className="api-create-form"
        >
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '名称不能为空',
                },
              ],
            })(<Input maxLength={30} placeholder="api" />)}
          </Form.Item>
          <Form.Item label="项目基础URL">
            {getFieldDecorator('baseUrl', {
              rules: [
                {
                  required: true,
                  message: '基础URL不能为空',
                },
              ],
            })(<Input addonBefore="/" maxLength={30} placeholder="example" />)}
          </Form.Item>
          <Form.Item label="项目代理URL">
            {getFieldDecorator('proxyUrl')(
              <Input
                addonBefore="http://"
                maxLength={30}
                placeholder="www.a.com"
              />
            )}
          </Form.Item>
          <Form.Item label="项目描述">
            {getFieldDecorator('desc')(
              <Input maxLength={255} placeholder="不填默认为项目名" />
            )}
          </Form.Item>
          <Form.Item className="ta-c">
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Form.create<FormProps>({})(ApiCreate);
