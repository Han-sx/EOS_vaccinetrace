import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class HistoryAction extends React.Component {
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
    var data = [];
    var data_t = [this.props.value.actions];
    data = data_t[0];
    for (var x in data) {
      var y = data[x].action_trace.act.name;
      var z = data[x].action_trace.act.data.ID;
      data[x].action_name = y;
      data[x].vaccine_ID = z;
    }

    const columns = [
      {
        title: "序号",
        dataIndex: "account_action_seq",
        key: "account_action_seq",
        width: "11%",
        ...this.getColumnSearchProps("account_action_seq")
      },
      {
        title: "动作序号(全局）",
        dataIndex: "global_action_seq",
        key: "global_action_seq",
        width: "18%",
        ...this.getColumnSearchProps("global_action_seq")
      },
      {
        title: "区块序号",
        dataIndex: "block_num",
        key: "block_num",
        width: "18%",
        ...this.getColumnSearchProps("block_num")
      },
      {
        title: "区块时间",
        dataIndex: "block_time",
        key: "block_time",
        width: "20%",
        ...this.getColumnSearchProps("block_time")
      },
      {
        title: "疫苗ID",
        dataIndex: "vaccine_ID",
        key: "vaccine_ID",
        width: "15%",
        ...this.getColumnSearchProps("vaccine_ID")
      },
      {
        title: "操作名",
        dataIndex: "action_name",
        key: "action_name",
        // width: "18%",
        ...this.getColumnSearchProps("action_name")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default HistoryAction;
