import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import ApiService from "../../ApiService";

var data = [];
var data_t = ApiService.find("vaccinetrace", "part1", "products"); //获取promise
data_t.then(value => {
  //.then获取promise值
  data = value;
});

class FindTable1 extends React.Component {
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
        width: "18%",
        ...this.getColumnSearchProps("vaccine_ID")
      },
      {
        title: "疫苗名称",
        dataIndex: "vaccine_name",
        key: "vaccine_name",
        width: "18%",
        ...this.getColumnSearchProps("vaccine_name")
      },
      {
        title: "生产厂家",
        dataIndex: "manufacturer",
        key: "manufacturer",
        width: "18%",
        ...this.getColumnSearchProps("manufacturer")
      },
      {
        title: "生产日期",
        dataIndex: "produce_date",
        key: "produce_date",
        width: "18%",
        ...this.getColumnSearchProps("produce_date")
      },
      {
        title: "保质期(天)",
        dataIndex: "shelf_life",
        key: "shelf_life",
        width: "10%",
        ...this.getColumnSearchProps("shelf_life")
      },
      {
        title: "授权单位",
        dataIndex: "authorization",
        key: "authorization",
        // width: "18%",
        ...this.getColumnSearchProps("authorization")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default FindTable1;
