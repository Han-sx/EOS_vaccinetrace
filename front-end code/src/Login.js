import React from "react";
import BGParticle from "./utils/BGParticle";
import { Form, Input, notification } from "antd";
import "./styles.css";
import Loading2 from "./components/Loading2";
import "animate.css";
import imgURL from "./img/背景.jpg";
import ApiService from "./ApiService";

const url = imgURL;

class LoginForm extends React.Component {
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
        message: [],
        focusItem: -1 //保存当前聚焦的input
      }
    };
    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
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
          console.log(object[0], "222");
          if (!object[0]) {
            console.log("未注册的用户名");
            alert("未注册的用户名，请重新输入");
          } else {
            console.log("已注册的用户名");
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
              console.log(this.props, "propss");
              this.props.switchShowBox(path);
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
              this.props.switchShowBox(path);
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
              this.props.switchShowBox(path);
            } else {
              //不属于输入环节
              console.log("未注册的用户名");
              alert("未注册的用户名，请重新输入");
              // this.setState({
              //   form: {
              //     ...form,
              //     username: value[0],
              //     actions: value[1].actions,
              //     publickey: value[2],
              //     message: object[0]
              //   }
              // });
              // console.log(this.state, "state");
              // const data = this.state;
              // const path = {
              //   pathname: "/View",
              //   query: data
              // };
              // this.props.switchShowBox(path);
            }
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

  handleSubmit2(event) {
    const path = {
      pathname: "/Guest"
    };
    this.props.switchShowBox(path);
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
      <div className={this.props.className}>
        <h3 className="title">基于EOS疫苗溯源系统</h3>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item>
            <Input
              onFocus={() =>
                this.setState({
                  form: {
                    ...form,
                    focusItem: 1
                  }
                })
              }
              onBlur={() =>
                this.setState({
                  form: {
                    ...form,
                    focusItem: -1
                  }
                })
              }
              type="password"
              placeholder="在此处输入私钥"
              name="key"
              value={form.key}
              onChange={this.handleChange}
              addonBefore={
                <span
                  className="iconfont icon-suo1"
                  style={form.focusItem === 1 ? styles.focus : {}}
                />
              }
            />
          </Form.Item>

          <div className="bottom">
            <input
              className="loginBtn"
              type="submit"
              value="登录"
              onClick={this.handleSubmit}
            />
            <span className="registerBtn" onClick={this.handleSubmit2}>
              游客登录
            </span>
          </div>
        </Form>
        <div className="footer">
          <div>欢迎登陆疫苗溯源管理系统</div>
        </div>
      </div>
    );
  }
}

class Login extends React.Component {
  state = {
    showBox: "login", //展示当前表单
    url: "", //背景图片
    loading: false,
    loading2: false
  };

  componentDidMount() {
    const isLogin = this.props.appStore;
    console.log(isLogin, "isLogin");
    if (isLogin) {
      this.props.history.go(1); //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
      // this.props.appStore.toggleLogin(false) //也可以设置退出登录
    }
    this.initPage();
    // preloadingImages(imgs); //预加载下一个页面的图片，预加载了第二次为什么还会去请求图片资源？
  }

  componentWillUnmount() {
    this.particle && this.particle.destory();
    notification.destroy();
  }
  //载入页面时的一些处理
  initPage = () => {
    this.setState({
      loading: true
    });
    this.loadImageAsync(url)
      .then(url => {
        this.setState({
          loading: false,
          url
        });
      })
      .then(() => {
        //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
        this.particle = new BGParticle("backgroundBox");
        this.particle.init();
        // notification.open({
        //   message: (
        //     <ul>
        //       <li>初始账号：admin</li>
        //       <li>初始密码：admin</li>
        //     </ul>
        //   ),
        //   duration: 0,
        //   className: "login-notification"
        // });
      });
  };
  //切换showbox
  switchShowBox = box => {
    // this.setState({
    //   showBox: box
    // });
    this.props.history.push(box);
  };

  //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
  loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
      const image = new Image();
      image.onload = function() {
        resolve(url);
      };
      image.onerror = function() {
        console.log("图片载入错误");
      };
      image.src = url;
    });
  }

  render() {
    const { showBox, loading } = this.state;
    return (
      <div id="login-page">
        {loading ? (
          <div>
            <h3 style={styles.loadingTitle} className="animated bounceInLeft">
              载入中...
            </h3>
            <Loading2 />
          </div>
        ) : (
          <div>
            <div id="backgroundBox" style={styles.backgroundBox} />
            <div className="container">
              <LoginForm
                className={
                  showBox === "login" ? "box showBox" : "box hiddenBox"
                }
                switchShowBox={this.switchShowBox}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  backgroundBox: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
    backgroundImage: "url(" + imgURL + ")",
    backgroundSize: "100% 100%",
    transition: "all .5s"
  },
  focus: {
    // transform: 'scale(0.7)',
    width: "20px",
    opacity: 1
  },
  loadingBox: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  loadingTitle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginLeft: -45,
    marginTop: -18,
    color: "#000",
    fontWeight: 500,
    fontSize: 24
  }
};

export default Login;
