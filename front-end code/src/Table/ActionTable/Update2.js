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

class Update2 extends Component {
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
        transport_number: "",
        transport_company: "",
        from_location: "",
        to_location: "",
        ship_date: "",
        arrival_date: ""
      }
    };
    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.dateChange1 = this.dateChange1.bind(this);
    this.dateChange2 = this.dateChange2.bind(this);
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

  dateChange1(date, dateString) {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        ship_date: dateString
      }
    });
  }

  dateChange2(date, dateString) {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        arrival_date: dateString
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
    return ApiService.update2(form)
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
          label="运输编号"
          name="transport_number"
          rules={[
            { required: true, message: "Please input transport_number!" }
          ]}
        >
          <Input
            name="transport_number"
            value={form.transport_number}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="运输公司"
          name="transport_company"
          rules={[
            { required: true, message: "Please input transport_company!" }
          ]}
        >
          <Input
            name="transport_company"
            value={form.transport_company}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="始发地"
          name="from_location"
          rules={[{ required: true, message: "Please input from_location!" }]}
        >
          <Input
            name="from_location"
            value={form.from_location}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="目的地"
          name="to_location"
          rules={[{ required: true, message: "Please input to_location!" }]}
        >
          <Input
            name="to_location"
            value={form.to_location}
            onChange={this.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="出发日期"
          name="ship_date"
          rules={[{ required: true, message: "Please input ship_date!" }]}
        >
          {/* <Input
            name="produce_date"
            value={form.produce_date}
            onChange={this.handleChange}
          /> */}
          <DatePicker onChange={this.dateChange1} />
        </Form.Item>

        <Form.Item
          label="到达日期"
          name="arrival_date"
          rules={[{ required: true, message: "Please input arrival_date!" }]}
        >
          {/* <Input
            name="produce_date"
            value={form.produce_date}
            onChange={this.handleChange}
          /> */}
          <DatePicker onChange={this.dateChange2} />
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

export default Update2;
