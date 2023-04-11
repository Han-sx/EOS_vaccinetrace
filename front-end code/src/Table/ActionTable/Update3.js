import React, { Component } from "react";
// Components
//import { Button } from 'components';
import { Form, Input, Button, Select, DatePicker } from "antd";
import "antd/dist/antd.css";
import ApiService from "../../ApiService";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

class Update3 extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for form data and error message
    this.state = {
      form: {
        username: this.props.value.username,
        key: this.props.value.key,
        scope: "part1",
        ID: "",
        inoculation_name: "",
        inoculation_number: "",
        inoculation_location: "",
        inoculation_date: "",
        authorization: ""
      }
    };
    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
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

  selectChange(value) {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        scope: value
      }
    });
  }

  dateChange(date, dateString) {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        inoculation_date: dateString
      }
    });
  }

  handleSubmit(event) {
    //停止默认表单提交浏览器行为
    event.preventDefault();

    // Extract `form` state
    const { form } = this.state;
    console.log("运行中");
    console.log("state:", this.state);
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    // const { setUser } = this.props;
    // Send a login transaction to the blockchain by calling the ApiService,
    // If it successes, save the username to redux store
    // Otherwise, save the error state for displaying the message
    return ApiService.update3(form)
      .then(() => {
        console.log("操作已完成");
      })
      .catch(err => {
        this.setState({ error: err.toString() });
      });
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
          label="账户名"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            name="username"
            value={form.username}
            defaultValue={this.props.value.username}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="私钥"
          name="key"
          rules={[{ required: true, message: "Please input your Key!" }]}
        >
          <Input.Password
            name="key"
            value={form.key}
            defaultValue={this.props.value.key}
            onChange={this.handleChange}
          />
        </Form.Item>

        {/* <Form.Item
          label="scope"
          name="scope"
          rules={[{ required: true, message: "Please input scope!" }]}
        >
          <Input name="scope" value={form.scope} onChange={this.handleChange} />
        </Form.Item> */}

        <Form.Item
          label="范围"
          name="scope"
          rules={[{ required: true, message: "Please input scope!" }]}
        >
          <Select defaultValue="part1" onChange={this.selectChange}>
            <Select.Option value="part1">part1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="疫苗ID"
          name="ID"
          rules={[{ required: true, message: "Please input ID!" }]}
        >
          <Input name="ID" value={form.ID} onChange={this.handleChange} />
        </Form.Item>

        <Form.Item
          label="接种人姓名"
          name="inoculation_name"
          rules={[
            { required: true, message: "Please input inoculation_name!" }
          ]}
        >
          <Input
            name="inoculation_name"
            value={form.inoculation_name}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="接种编号"
          name="inoculation_number"
          rules={[
            { required: true, message: "Please input inoculation_number!" }
          ]}
        >
          <Input
            name="inoculation_number"
            value={form.inoculation_number}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="接种地点"
          name="inoculation_location"
          rules={[
            { required: true, message: "Please input inoculation_location!" }
          ]}
        >
          <Input
            name="inoculation_location"
            value={form.inoculation_location}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="接种日期"
          name="inoculation_date"
          rules={[
            { required: true, message: "Please input inoculation_date!" }
          ]}
        >
          {/* <Input
            name="produce_date"
            value={form.produce_date}
            onChange={this.handleChange}
          /> */}
          <DatePicker onChange={this.dateChange} />
        </Form.Item>

        <Form.Item
          label="授权单位"
          name="authorization"
          rules={[{ required: true, message: "Please input authorization!" }]}
        >
          <Input
            name="authorization"
            value={form.authorization}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Update3;
