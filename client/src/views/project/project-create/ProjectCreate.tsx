/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Spots from 'components/spots';
import { Project } from 'typings/project';
import { projectCreate } from '../../../services/project';
import './index.less';

interface FormProps extends FormComponentProps {
  [propName: string]: any; // 要传进来的属性
}

function ProjectCreate(props: any) {
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
        const { baseUrl, desc, name, target } = fieldsValue;
        const param: Partial<Project> = {
          baseUrl: `/${baseUrl}`,
          desc: desc || name,
          name,
          proxy: {
            target: target ? `http://${target}` : '',
          },
        };
        try {
          const rs = await projectCreate(param);
          if (rs) {
            message.success('项目创建成功');
            props.history.push('/');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="project-create">
      <div className="project-create-header">
        <Spots />
        <div className="header-info">
          <h2>创建项目</h2>
          <p>快来创建一个令人愉快的项目吧～</p>
        </div>
      </div>
      <div className="project-create-content">
        <Form
          layout="vertical"
          onSubmit={handleSubmit}
          {...formItemLayout}
          className="project-create-form"
        >
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '名称不能为空',
                },
                {
                  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\-_.]{0,30}$/,
                  message:
                    '仅支持汉字、英文字母、数字、下划线(_)、连字符(-)、点(.)',
                },
              ],
            })(<Input maxLength={30} placeholder="project" />)}
          </Form.Item>
          <Form.Item label="项目基础URL">
            {getFieldDecorator('baseUrl', {
              rules: [
                {
                  required: true,
                  message: '基础URL不能为空',
                },
                {
                  pattern: /^[a-zA-Z]*$/,
                  message: '格式为大小写英文字母',
                },
              ],
            })(<Input addonBefore="/" maxLength={30} placeholder="example" />)}
          </Form.Item>
          <Form.Item label="项目代理URL">
            {getFieldDecorator('target', {
              rules: [
                {
                  pattern: /^((https?:\/\/)?(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,
                  message: '格式不正确',
                },
              ],
            })(
              <Input
                addonBefore="http://"
                maxLength={255}
                placeholder="www.abc.com"
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

export default Form.create<FormProps>({})(ProjectCreate);
