import { Layout, Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo } from "@/store/modules/userStore";

const { Header, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("首页", "/home", <HomeOutlined />),
  getItem("文章管理", "/article", <DiffOutlined />),
  getItem("发布文章", "/publish", <EditOutlined />),
];

const GeekLayout = () => {
  //菜单路由跳转
  const navigate = useNavigate();
  const onClickMenu = (key) => {
    // console.log(key);
    navigate(key.keyPath[0]);
  };
  //用户信息展示
  const userName = useSelector((state) => state.user.userInfo.name);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onClickMenu}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
