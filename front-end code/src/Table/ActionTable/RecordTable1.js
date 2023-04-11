import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ApiService from "../../ApiService";

var data = [];
const data_t = ApiService.find("vaccinetrace", "part1", "productsr"); //获取promise
data_t.then(value => {
  //.then获取promise值
  data = value;
});

class RecordTable1 extends React.Component {
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
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
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
        title: "序号",
        dataIndex: "number",
        key: "number",
        width: "11%",
        ...this.getColumnSearchProps("number")
      },
      {
        title: "疫苗ID",
        dataIndex: "vaccine_ID",
        key: "vaccine_ID",
        width: "11%",
        ...this.getColumnSearchProps("vaccine_ID")
      },
      {
        title: "疫苗名称",
        dataIndex: "vaccine_name",
        key: "vaccine_name",
        width: "11%",
        ...this.getColumnSearchProps("vaccine_name")
      },
      {
        title: "生产厂家",
        dataIndex: "manufacturer",
        key: "manufacturer",
        width: "11%",
        ...this.getColumnSearchProps("manufacturer")
      },
      {
        title: "生产日期",
        dataIndex: "produce_date",
        key: "produce_date",
        width: "11%",
        ...this.getColumnSearchProps("produce_date")
      },
      {
        title: "保质期",
        dataIndex: "shelf_life",
        key: "shelf_life",
        width: "11%",
        ...this.getColumnSearchProps("shelf_life")
      },
      {
        title: "授权单位",
        dataIndex: "authorization",
        key: "authorization",
        width: "11%",
        ...this.getColumnSearchProps("authorization")
      },
      {
        title: "操作名称",
        dataIndex: "operating",
        key: "operating",
        width: "11%",
        ...this.getColumnSearchProps("operating")
      },
      {
        title: "操作时间(时间戳)",
        dataIndex: "time",
        key: "time",
        // width: "18%",
        ...this.getColumnSearchProps("time")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default RecordTable1;
