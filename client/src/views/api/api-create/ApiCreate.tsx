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

  const options = {
    selectOnLineNumbers: true,
  };

  const [code, setCode] = useState('// type your code...');

  const editorDidMount: EditorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    console.log('monaco', monaco);
    editor.focus();
    editor.layout();
    setTimeout(() => {
      editor.layout();
      const model = editor.getModel();
      if (model) {
        console.log(model.getValue(), 'model.getValue()');
        // console.log(JSON.parse(model.getValue()));
      }
    }, 100);
  };
  const editorWillMount: EditorWillMount = monaco => {
    console.log('editorWillMount', monaco);
  };
  const onChange: ChangeHandler = (newValue, e) => {
    console.log('onChange', newValue, e);
    setCode(newValue);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, fieldsValue: any) => {
      if (!err) {
        console.log(fieldsValue);
        console.log(code, 'code');
        // const model = monacoRef.editor.getModel();
        // console.log(model, 'model');
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
              ],
            })(<Input maxLength={30} placeholder="api" />)}
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
              ],
            })(<Input addonBefore="/" maxLength={30} placeholder="" />)}
          </Form.Item>
          <Form.Item label="接口描述">
            {getFieldDecorator('desc')(
              <Input maxLength={255} placeholder="" />
            )}
          </Form.Item>
          <Form.Item className="ta-c">
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="api-create-main">
        <MonacoEditor
          width="100%"
          height="100%"
          language="json"
          theme="vs"
          value={code}
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
