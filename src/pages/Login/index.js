import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "@/store/modules/userStore";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    await dispatch(fetchLogin(values));
    navigate("/");
    message.success("登录成功");
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          onFinish={onFinish}
          initialValues={{ mobile: "13811111111", code: "246810" }}
          validateTrigger={["onBlur"]}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                required: true,
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式不正确",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
