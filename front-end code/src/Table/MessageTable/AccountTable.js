import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Descriptions } from "antd";

class AccountTable extends React.Component {
  render() {
    return (
      <Descriptions title="账户基本信息：" bordered>
        <Descriptions.Item label="账户名">
          {this.props.value.username}
        </Descriptions.Item>
        <Descriptions.Item label="所属单位">
          {this.props.value.message.unit}
        </Descriptions.Item>
        <Descriptions.Item label="负责人">
          {this.props.value.message.supervisor}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {this.props.value.message.phone}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">
          {this.props.value.message.email}
        </Descriptions.Item>
        <Descriptions.Item label="权限">
          {this.props.value.message.authority}
        </Descriptions.Item>
        <Descriptions.Item label="公钥" span={3}>
          {this.props.value.publickey}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item> */}
      </Descriptions>
    );
  }
}

export default AccountTable;
