import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ApiService from "../../ApiService";

var data = [];
var data_t = ApiService.find("vaccinetrace", "part1", "transport"); //获取promise
data_t.then(value => {
  //.then获取promise值
  data = value;
});

class FindTable2 extends React.Component {
  state = {
    searchText: "",
    searchedColumn: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          查询
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "疫苗ID",
        dataIndex: "vaccine_ID",
        key: "vaccine_ID",
        width: "14%",
        ...this.getColumnSearchProps("vaccine_ID")
      },
      {
        title: "运输编号",
        dataIndex: "transport_number",
        key: "transport_number",
        // width: "18%",
        ...this.getColumnSearchProps("transport_number")
      },
      {
        title: "运输公司",
        dataIndex: "transport_company",
        key: "transport_company",
        width: "14%",
        ...this.getColumnSearchProps("transport_company")
      },
      {
        title: "始发地",
        dataIndex: "from_location",
        key: "from_location",
        width: "14%",
        ...this.getColumnSearchProps("from_location")
      },
      {
        title: "目的地",
        dataIndex: "to_location",
        key: "to_location",
        width: "14%",
        ...this.getColumnSearchProps("to_location")
      },
      {
        title: "出发日期",
        dataIndex: "ship_date",
        key: "ship_date",
        width: "14%",
        ...this.getColumnSearchProps("ship_date")
      },
      {
        title: "到达日期",
        dataIndex: "arrival_date",
        key: "arrival_date",
        width: "14%",
        ...this.getColumnSearchProps("arrival_date")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default FindTable2;
