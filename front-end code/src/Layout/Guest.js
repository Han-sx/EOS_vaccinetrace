import React, { Component } from "react";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Menu } from "antd";
import {
  CarOutlined,
  NotificationOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

import FindTable1 from "../Table/ActionTable/FindTable1";
import RecordTable1 from "../Table/ActionTable/RecordTable1";
import FindTable2 from "../Table/ActionTable/FindTable2";
import RecordTable2 from "../Table/ActionTable/RecordTable2";
import FindTable3 from "../Table/ActionTable/FindTable3";
import RecordTable3 from "../Table/ActionTable/RecordTable3";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Guest extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for form data and error message
    this.state = {
      showElem1: "",
      showElem2: "none",
      showElem3: "none",
      showElem4: "none",
      showElem5: "none",
      showElem6: "none",
      showElem7: "none"
    };
    // Bind functions
    this.changePage1 = this.changePage1.bind(this);
    this.changePage2 = this.changePage2.bind(this);
    this.changePage3 = this.changePage3.bind(this);
    this.changePage4 = this.changePage4.bind(this);
    this.changePage5 = this.changePage5.bind(this);
    this.changePage6 = this.changePage6.bind(this);
    this.changePage7 = this.changePage7.bind(this);
  }

  changePage1(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "",
      showElem2: "none",
      showElem3: "none",
      showElem4: "none",
      showElem5: "none",
      showElem6: "none",
      showElem7: "none"
    });
  }
  changePage2(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "none",
      showElem2: "",
      showElem3: "none",
      showElem4: "none",
      showElem5: "none",
      showElem6: "none",
      showElem7: "none"
    });
  }
  changePage3(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "none",
      showElem2: "none",
      showElem3: "",
      showElem4: "none",
      showElem5: "none",
      showElem6: "none",
      showElem7: "none"
    });
  }
  changePage4(event) {
    //隐藏表单函数
    //获取EOS table数据
    this.setState({
      showElem1: "none",
      showElem2: "none",
      showElem3: "none",
      showElem4: "",
      showElem5: "none",
      showElem6: "none",
      showElem7: "none"
    });
  }
  changePage5(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "none",
      showElem2: "none",
      showElem3: "none",
      showElem4: "none",
      showElem5: "",
      showElem6: "none",
      showElem7: "none"
    });
  }
  changePage6(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "none",
      showElem2: "none",
      showElem3: "none",
      showElem4: "none",
      showElem5: "none",
      showElem6: "",
      showElem7: "none"
    });
  }
  changePage7(event) {
    //隐藏表单函数
    this.setState({
      showElem1: "none",
      showElem2: "none",
      showElem3: "none",
      showElem4: "none",
      showElem5: "none",
      showElem6: "none",
      showElem7: ""
    });
  }

  render() {
    // try {
    //   var data = this.props.location.query.form;
    // } catch (err) {
    //   console.log(err);
    //   alert("请登录后使用");
    //   var path = {
    //     pathname: "/"
    //   };
    //   this.props.history.push(path);
    //   return false;
    // }

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">疫苗溯源</Menu.Item>
            {/* <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item> */}
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <ScheduleOutlined />
                    生产信息溯源
                  </span>
                }
              >
                <Menu.Item key="1" onClick={this.changePage1}>
                  生产信息查询
                </Menu.Item>
                <Menu.Item key="2" onClick={this.changePage2}>
                  修改记录
                </Menu.Item>
                {/* <Menu.Item key="3">option7</Menu.Item>
                <Menu.Item key="4">option8</Menu.Item> */}
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <CarOutlined />
                    运输信息溯源
                  </span>
                }
              >
                <Menu.Item key="3" onClick={this.changePage3}>
                  运输信息查询
                </Menu.Item>
                <Menu.Item key="4" onClick={this.changePage4}>
                  修改记录
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <NotificationOutlined />
                    接种信息溯源
                  </span>
                }
              >
                <Menu.Item key="5" onClick={this.changePage5}>
                  接种信息查询
                </Menu.Item>
                <Menu.Item key="6" onClick={this.changePage6}>
                  修改记录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <div style={{ display: this.state.showElem1 }}>
                <FindTable1 />
              </div>
              <div style={{ display: this.state.showElem2 }}>
                <RecordTable1 />
              </div>
              <div style={{ display: this.state.showElem3 }}>
                <FindTable2 />
              </div>
              <div style={{ display: this.state.showElem4 }}>
                <RecordTable2 />
              </div>
              <div style={{ display: this.state.showElem5 }}>
                <FindTable3 />
              </div>
              <div style={{ display: this.state.showElem6 }}>
                <RecordTable3 />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Guest;
