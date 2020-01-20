/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useRef } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import MonacoEditor, {
  EditorWillMount,
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import { FormComponentProps } from 'antd/lib/form';
import Spots from 'components/spots';
import './index.less';
import { stripComment } from 'utils/tools';
import { editor } from 'monaco-editor';
import { apiCreate } from 'services/api';

const { Option } = Select;

interface FormProps extends FormComponentProps {
  [propName: string]: any; // 要传进来的属性
}

function ApiCreate(props: any) {
  const methods = ['get', 'post', 'put', 'delete', 'patch'];
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

  // 保存编辑器实例
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const options = {
    selectOnLineNumbers: true,
  };

  const [code, setCode] = useState('// type your mock data...');

  const editorDidMount: EditorDidMount = (e, monaco) => {
    console.log('editorDidMount', e);
    console.log('monaco', monaco);
    e.focus();
    e.layout();
    editorRef.current = e;
    setTimeout(() => {
      e.layout();
      editorRef.current = e;
      // const model = editor.getModel();
      // if (model) {
      //   console.log(model.getValue(), 'model.getValue()');
      //   // console.log(JSON.parse(model.getValue()));
      // }
    }, 100);
  };
  const editorWillMount: EditorWillMount = monaco => {
    console.log('editorWillMount', monaco);
  };
  const onChange: ChangeHandler = (newValue, e) => {
    console.log('onChange', newValue, e);
    // console.log(stripComment(newValue));
    setCode(newValue);
  };

  const trigger = (e: editor.IStandaloneCodeEditor, id: string) => {
    console.log(e, 'meditor');
    if (!e) return;
    console.log('onFormataaa');
    e.trigger('anyString', id, null);
  };

  // 格式化代码
  const onFormat = () => {
    if (editorRef.current) {
      trigger(editorRef.current, 'editor.action.formatDocument');
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, fieldsValue: any) => {
      if (!err) {
        console.log(fieldsValue);
        const { name, method, desc, url, delay } = fieldsValue;
        let response;
        try {
          response = JSON.parse(stripComment(code) || '{}');
          console.log(JSON.parse(stripComment(code) || '{}'), 'code');
        } catch (error) {
          console.log(error);
          message.error('mock 数据有错误，请检查修改后再次创建');
          return;
        }
        const param = {
          name,
          desc: desc || '',
          url: `/${url}`,
          options: {
            method,
            params: {},
            response,
            delay,
          },
          project: props.location.search.split('=')[1],
        };
        console.log(param, 'param');
        try {
          const rs = await apiCreate(param);
          if (rs) {
            message.success('接口创建成功');
            props.history.goBack();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="api-create">
      <div className="api-create-side">
        <Spots />
        <div className="header-info">
          <h2>创建接口</h2>
          <p>快来创建一个令人愉快的接口吧～</p>
        </div>
        <Form
          layout="vertical"
          onSubmit={handleSubmit}
          {...formItemLayout}
          className="api-create-form"
        >
          <Form.Item label="接口名称">
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
            })(<Input maxLength={30} placeholder="" />)}
          </Form.Item>
          <Form.Item label="方法">
            {getFieldDecorator('method', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: methods[0],
            })(
              <Select>
                {methods.map((k: string) => (
                  <Option key={k} value={k}>
                    {k}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="URL">
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: 'URL不能为空',
                },
                {
                  pattern: /^[a-zA-Z]*$/,
                  message: '格式为大小写英文字母',
                },
              ],
            })(<Input addonBefore="/" maxLength={30} placeholder="" />)}
          </Form.Item>
          <Form.Item label="接口返回延时">
            {getFieldDecorator('delay', {
              rules: [
                {
                  required: true,
                  message: '延时不能为空',
                },
                {
                  pattern: /^(0|[1-9][0-9]*)$/,
                  message: '延时为正整数',
                },
              ],
              initialValue: 0,
            })(
              <Input
                addonAfter="ms"
                type="number"
                maxLength={8}
                placeholder=""
              />
            )}
          </Form.Item>
          <Form.Item label="接口描述">
            {getFieldDecorator('desc')(
              <Input maxLength={255} placeholder="" />
            )}
          </Form.Item>
          <Form.Item className="ta-c">
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
        <div className="side-btn">
          <Button type="primary" onClick={onFormat}>
            格式化
          </Button>
          <Button
            type="primary"
            onClick={() => {
              props.history.goBack();
            }}
          >
            关闭
          </Button>
        </div>
      </div>
      <div className="api-create-main">
        <MonacoEditor
          width="100%"
          height="100%"
          language="json"
          theme="vs"
          defaultValue={code}
          options={options}
          onChange={onChange}
          editorWillMount={editorWillMount}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
}

export default Form.create<FormProps>({})(ApiCreate);
