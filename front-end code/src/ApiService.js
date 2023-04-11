import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import ecc from "eosjs-ecc";

//连接主链的action执行函数
async function takeAction(action, dataValue) {
  //action -我们要调用的智能合约操作的名称
  //dataValue -智能合约操作的参数
  const privateKey = localStorage.getItem("vaccinetrace_key");
  console.log(privateKey);
  const rpc = new JsonRpc("http://localhost:8888"); //JsonRpc -连接到EOSIO节点的HTTP端点的rpc客户端
  const signatureProvider = new JsSignatureProvider([privateKey]); //签署交易（我们使用用户的私钥创建）所必需
  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder()
  });

  // Main call to blockchain after setting action, account_name and data
  try {
    const resultWithConfig = await api.transact(
      {
        actions: [
          {
            account: "vaccinetrace", //合同名称
            name: action, //name -我们要调用的动作的名称
            authorization: [
              {
                //authorization -用于签署交易
                actor: localStorage.getItem("vaccinetrace_account"),
                permission: "active"
              }
            ],
            data: dataValue
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
    console.log(
      resultWithConfig.processed.action_traces[0].console,
      "--resultWithConfig"
    );
    return resultWithConfig;
  } catch (err) {
    console.log("\nCaught exception: " + err);
    if (err instanceof RpcError) console.log(JSON.stringify(err.json, null, 2));
    throw err;
  }
}

//查询公钥对应账户
async function findaccount(publicKey) {
  const rpc = new JsonRpc("http://localhost:8888");
  const accounts = await rpc.history_get_key_accounts(publicKey);
  return new Promise((resolve, reject) => {
    resolve(accounts);
  });
}

//查询账户对应action
async function findactions(account) {
  const rpc = new JsonRpc("http://localhost:8888");
  const actions = await rpc.history_get_actions(account, 0, 1000); //获取actions数量为0-1000
  return new Promise((resolve, reject) => {
    resolve(actions);
  });
}

//查询table表数据
async function findtable(contract_n, scoep_n, table_n) {
  // const { JsonRpc } = require("eosjs");
  // const fetch = require("node-fetch");
  const rpc = new JsonRpc("http://localhost:8888");
  const resp = await rpc.get_table_rows({
    json: true,
    code: contract_n, //合约名
    scope: scoep_n, //scope
    table: table_n, //表名
    limit: 100 //限制行数100行
  });
  return new Promise((resolve, reject) => {
    resolve(resp.rows);
  });
}
//================================================================================

class ApiService {
  //————————————————————————————————————————————————————————————————————————————————
  static login(privateKey) {
    if (ecc.isValidPrivate(privateKey)) {
      //若私钥有效
      const publicKey = ecc.privateToPublic(privateKey); //获取公钥
      console.log(publicKey, "publicKey");
      const accounts = findaccount(publicKey); //通过获取账户promise
      var accounts_t; //定义string类型账户
      var actions_t; //定义string类型actionsf
      var actions; //定义promise类型actions
      var account_table; //定义promise类型账户表
      var accounts_table_t; //定义string类型账户表
      return accounts.then(value => {
        if (value.account_names.length === 0) {
          //检验是否为空账户
          return false;
        } else {
          //若不为空账户
          accounts_t = value.account_names[0]; //获取公钥对应的第一个账户名
          actions = findactions(accounts_t); //通过账户名获取actions
          return actions.then(value_t => {
            actions_t = value_t;
            account_table = findtable("vaccinetrace", "part1", "registers"); //获取注册信息表
            return account_table.then(value_t2 => {
              accounts_table_t = value_t2;
              return [accounts_t, actions_t, publicKey, accounts_table_t];
            });
          });
        }
      });
    } else {
      console.log("false");
      return false;
    }
  }

  //————————————————————————————————————————————————————————————————————————————————
  static add1({
    username,
    key,
    scope,
    ID,
    vaccine_name,
    manufacturer,
    produce_date,
    shelf_life,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("add1", {
        scope: scope,
        ID: ID,
        vaccine_name: vaccine_name,
        manufacturer: manufacturer,
        produce_date: produce_date,
        shelf_life: shelf_life,
        authorization: authorization
      })
        .then(value => {
          resolve();
          console.log(
            "返回控制台信息:",
            value.processed.action_traces[0].console
          );
          alert(value.processed.action_traces[0].console);
        })
        .catch(err => {
          console.log("上链失败:", err);
          alert("上链失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static update1({
    username,
    key,
    scope,
    ID,
    vaccine_name,
    manufacturer,
    produce_date,
    shelf_life,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("update1", {
        scope: scope,
        ID: ID,
        vaccine_name: vaccine_name,
        manufacturer: manufacturer,
        produce_date: produce_date,
        shelf_life: shelf_life,
        authorization: authorization
      })
        .then(() => {
          resolve();
          console.log("成功修改信息");
          alert("成功修改信息");
        })
        .catch(err => {
          console.log("修改信息失败");
          alert("修改信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static erase1({
    username,
    key,
    scope,
    ID,
    vaccine_name,
    manufacturer,
    produce_date,
    shelf_life,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("erase1", {
        scope: scope,
        ID: ID
      })
        .then(() => {
          resolve();
          console.log("成功删除信息");
          alert("成功删除信息");
        })
        .catch(err => {
          console.log("删除信息失败");
          alert("删除信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //=================================================================================
  static add2({
    username,
    key,
    scope,
    ID,
    transport_number,
    transport_company,
    from_location,
    to_location,
    ship_date,
    arrival_date
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("add2", {
        scope: scope,
        ID: ID,
        transport_number: transport_number,
        transport_company: transport_company,
        from_location: from_location,
        to_location: to_location,
        ship_date: ship_date,
        arrival_date: arrival_date
      })
        .then(value => {
          resolve();
          console.log(
            "返回控制台信息:",
            value.processed.action_traces[0].console
          );
          alert(value.processed.action_traces[0].console);
        })
        .catch(err => {
          console.log("上链失败:", err);
          alert("上链失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static update2({
    username,
    key,
    scope,
    ID,
    transport_number,
    transport_company,
    from_location,
    to_location,
    ship_date,
    arrival_date
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("update2", {
        scope: scope,
        ID: ID,
        transport_number: transport_number,
        transport_company: transport_company,
        from_location: from_location,
        to_location: to_location,
        ship_date: ship_date,
        arrival_date: arrival_date
      })
        .then(() => {
          resolve();
          console.log("成功修改信息");
          alert("成功修改信息");
        })
        .catch(err => {
          console.log("修改信息失败");
          alert("修改信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static erase2({
    username,
    key,
    scope,
    ID,
    transport_number,
    transport_company,
    from_location,
    to_location,
    ship_date,
    arrival_date
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("erase2", {
        scope: scope,
        ID: ID
      })
        .then(() => {
          resolve();
          console.log("成功删除信息");
          alert("成功删除信息");
        })
        .catch(err => {
          console.log("删除信息失败");
          alert("删除信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //=================================================================================
  static add3({
    username,
    key,
    scope,
    ID,
    inoculation_name,
    inoculation_number,
    inoculation_location,
    inoculation_date,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("add3", {
        scope: scope,
        ID: ID,
        inoculation_name: inoculation_name,
        inoculation_number: inoculation_number,
        inoculation_location: inoculation_location,
        inoculation_date: inoculation_date,
        authorization: authorization
      })
        .then(value => {
          resolve();
          console.log(
            "返回控制台信息:",
            value.processed.action_traces[0].console
          );
          alert(value.processed.action_traces[0].console);
        })
        .catch(err => {
          console.log("上链失败:", err);
          alert("上链失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static update3({
    username,
    key,
    scope,
    ID,
    inoculation_name,
    inoculation_number,
    inoculation_location,
    inoculation_date,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("update3", {
        scope: scope,
        ID: ID,
        inoculation_name: inoculation_name,
        inoculation_number: inoculation_number,
        inoculation_location: inoculation_location,
        inoculation_date: inoculation_date,
        authorization: authorization
      })
        .then(() => {
          resolve();
          console.log("成功修改信息");
          alert("成功修改信息");
        })
        .catch(err => {
          console.log("修改信息失败");
          alert("修改信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //————————————————————————————————————————————————————————————————————————————————
  static erase3({
    username,
    key,
    scope,
    ID,
    inoculation_name,
    inoculation_number,
    inoculation_location,
    inoculation_date,
    authorization
  }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("vaccinetrace_account", username);
      localStorage.setItem("vaccinetrace_key", key);

      takeAction("erase3", {
        scope: scope,
        ID: ID
      })
        .then(() => {
          resolve();
          console.log("成功删除信息");
          alert("成功删除信息");
        })
        .catch(err => {
          console.log("删除信息失败");
          alert("删除信息失败");
          localStorage.removeItem("vaccinetrace_account");
          localStorage.removeItem("vaccinetrace_key");
          reject(err);
          console.log(err.dataValue);
        });
    });
  }
  //=================================================================================
  static find(contract_n, scoep_n, table_n) {
    return findtable(contract_n, scoep_n, table_n).then(value => {
      return value;
    });
  }
}
export default ApiService;
