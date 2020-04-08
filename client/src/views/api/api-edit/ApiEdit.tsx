/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
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
import { queryApi, updateApi } from 'services/api';
import { Api } from 'typings/api';

const { Option } = Select;

interface FormProps extends FormComponentProps {
  [propName: string]: any; // 要传进来的属性
}

function ApiEdit(props: any) {
  const { apiId } = useParams();
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

  const initApi = {
    _id: '',
    name: '',
    desc: '',
    url: '',
    options: {
      method: '',
      params: '',
      response: '{}',
      delay: 0,
    },
    project: '',
    createTime: 0,
    modifiedTime: 0,
  };

  // 保存编辑器实例
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const options = {
    selectOnLineNumbers: true,
  };

  const [api, setApi] = useState<Api>(initApi);

  const [code, setCode] = useState('');

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
          ...api,
          name,
          desc: desc || '',
          url: `/${url}`,
          options: {
            method,
            params: {},
            response,
            delay,
          },
        };
        console.log(param, 'param');
        try {
          const rs = await updateApi(param);
          if (rs) {
            message.success('接口保存成功');
            props.history.goBack();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    const query = async () => {
      if (!apiId) return;
      try {
        const rs = await queryApi({ apiId: apiId as string });
        if (rs) {
          setCode(JSON.stringify(rs.options.response));
          setApi(rs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    query();
  }, [apiId]);

  useEffect(() => {
    if (!api._id) return;
    setTimeout(() => {
      onFormat();
    }, 100);
    setTimeout(() => {
      onFormat();
    }, 160);
    setTimeout(() => {
      onFormat();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api._id]);

  const { getFieldDecorator } = props.form;

  return (
    <div className="api-create">
      <div className="api-create-side">
        <Spots />
        <div className="header-info">
          <h2>编辑接口</h2>
          <p>(╯‵□′)╯︵┻━┻</p>
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
              initialValue: api.name,
            })(<Input maxLength={30} placeholder="" />)}
          </Form.Item>
          <Form.Item label="方法">
            {getFieldDecorator('method', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: api.options.method,
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
                  pattern: /^[a-zA-Z-_/]*$/,
                  message: '格式为大小写英文字母、/、-、_',
                },
              ],
              initialValue: api.url.substring(1),
            })(<Input addonBefore="/" maxLength={60} placeholder="" />)}
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
              initialValue: api.options.delay,
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
            {getFieldDecorator('desc', {
              initialValue: api.desc,
            })(<Input maxLength={255} placeholder="" />)}
          </Form.Item>
          <Form.Item className="ta-c">
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              保存
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
            返回
          </Button>
        </div>
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

export default Form.create<FormProps>({})(ApiEdit);
