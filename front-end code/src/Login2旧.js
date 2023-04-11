import React, { Component } from "react";
// Components
//import { Button } from 'components';
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import ApiService from "./ApiService";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

class Login extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for form data and error message
    this.state = {
      form: {
        username: "",
        key: "",
        publickey: "",
        actions: [],
        message: []
      }
    };
    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Runs on every keystroke to update the React state
  handleChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    //停止默认表单提交浏览器行为
    event.preventDefault();
    // Extract `form` state
    const { form } = this.state;
    console.log("运行中");
    var data_t = ApiService.login(form.key); //获取login函数提供的数组
    if (data_t !== false) {
      //如果返回false则为无效私钥
      data_t.then(value => {
        //.then获取promise值
        if (value !== false) {
          //若value值为false则为无用户名私钥
          console.log(value, "value");
          var object = value[3].filter(item => item.username === value[0]);
          console.log(object, "检索中");

          if (object[0].authority === "生产信息管理") {
            //若为生产环节
            this.setState({
              form: {
                ...form,
                username: value[0],
                actions: value[1].actions,
                publickey: value[2],
                message: object[0]
              }
            });
            console.log(this.state, "state");
            const data = this.state;
            const path = {
              pathname: "/Manufacturer",
              query: data
            };
            console.log(this.props, "props");
            this.props.history.push(path);
          } else if (object[0].authority === "运输信息管理") {
            //若为运输环节
            this.setState({
              form: {
                ...form,
                username: value[0],
                actions: value[1].actions,
                publickey: value[2],
                message: object[0]
              }
            });
            console.log(this.state, "state");
            const data = this.state;
            const path = {
              pathname: "/Transporter",
              query: data
            };
            this.props.history.push(path);
          } else if (object[0].authority === "接种信息管理") {
            //若为接种环节
            this.setState({
              form: {
                ...form,
                username: value[0],
                actions: value[1].actions,
                publickey: value[2],
                message: object[0]
              }
            });
            console.log(this.state, "state");
            const data = this.state;
            const path = {
              pathname: "/Inoculation",
              query: data
            };
            this.props.history.push(path);
          } else {
            //不属于输入环节
            this.setState({
              form: {
                ...form,
                username: value[0],
                actions: value[1].actions,
                publickey: value[2],
                message: object[0]
              }
            });
            console.log(this.state, "state");
            const data = this.state;
            const path = {
              pathname: "/View",
              query: data
            };
            this.props.history.push(path);
          }
        } else {
          console.log("无用户名的私钥");
          alert("无用户名私钥，请重新输入");
        }
      });
    } else {
      console.log("无效的私钥");
      alert("无效的私钥，请重新输入");
    }

    // return ApiService.login(form.key)
    //   .then(() => {
    //     console.log("Succuss");
    //   })
    //   .catch(err => {
    //     this.setState({ error: err.toString() });
    //   });
  }

  render() {
    // Extract data from state
    const { form } = this.state;

    const onFinish = values => {
      console.log("Success:", values);
      console.log("state:", this.state);
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="私钥"
          name="key"
          rules={[{ required: true, message: "Please input your Key!" }]}
        >
          <Input.Password
            name="key"
            value={form.key}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            登录
          </Button>

          <Button type="link" htmlType="button">
            游客登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
