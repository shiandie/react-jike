# 功能实现

## 登录功能

### 校验登录表单

1.  给 form 设置 validateTrigger 属性，校验触发事件
2.  **给 form.item 设置 name 属性**
3.  给 form.item 设置 rules 属性，设置校验规则

### 获取登录表单数据

1. 给 form 设置 onfinish 属性 获取表单数据

```js
const onFinish = (values) => {
  console.log("Success:", values);
};
```

### 登录逻辑和添加 token

1. token 交给 redux 管理
2. 编写异步方法，修改 token
3. 登录逻辑
   3.1 使用 useNavigate 进行路由跳转
   3.2 使用 useDispatch 调用异步方法，登录成功的时候，把这次用户 token 保存到 redux
   3.3 添加跳转成功通知

### token 持久化

redux 存储是基于内存的，因此存储 token 给 redux 同时，把 token 添加到 application 中

1. 使用 localStorage..setItem 方法把 token 存储到 application 中
2. 使用 localStorage..setItem 方法在获取应用中的 token
   **为方便调用。封装 token 方法**

```js
// 封装存取方法

const TOKENKEY = "token_key";

function setToken(token) {
  return localStorage.setItem(TOKENKEY, token);
}

function getToken() {
  return localStorage.getItem(TOKENKEY);
}

function removeToken() {
  return localStorage.removeItem(TOKENKEY);
}

export { setToken, getToken, removeToken };
```

3. 初始化的时候，如果应用中有 token，则把应用中的 token 存储到 redux 中

```js
token: getToken() || "";
```

### 权限控制

将 token 添加到请求头

```js
const token = getToken();
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

**路由鉴权实现**
判断本地是否有 token，如果有，就返回子组件，否则就重定向到登录 Login
**代码实现**
`components/AuthRoute/index.jsx`

```jsx
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;
```

`src/router/index.jsx`

```js
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
  },
```

**token 和权限路由的配合使用，完成了权限控制**

## 主页 layout 功能

### 点击菜单跳转路由

**路由结构**
Layout
--home
--article
--publish

1. 设置二级路由出口
   `<Outlet />`标签
2. 给 menu 菜单设置点击事件，获取点击事件
3. 在点击事件中获取当前点击项的 path 属性

```js
const onClickMenu = (route) => {
  console.log(route); //route中包含path
};
```

4. 使用 useNavigate 进行路由跳转

```js
const navigate = useNavigate();
navigate(key.path[0]);
```

### 展示个人信息

1. 在 Redux 的 store 中定义用户信息，setter 方法,和异步请求获取用户信息方法

2. 在 Layout 组件中触发 action 的执行
   2.1 使用 useSelector，允许在组件中访问 redux 中的数据
   2.2 使用 useDispatch，允许在组件中触发 action 的执行
   2.3 为什么要使用 useEffect，依赖项为什么是 dispatch

```js
const userName = useSelector((state) => state.user.userInfo.name);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchUserInfo());
}, [dispatch]);
```

3. 在视图中展示,用户名:{userName}

### 用户登出

业务逻辑

1. 清除 redux 中的 token，userInfo
2. 清除 application 中的 token
3. 跳转到登录页面

代码实现

1. 给冒泡按钮设置确定点击事件
2. 在点击事件中清除 redux 中的 token，userInfo，application 中的 token

```js
clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
```

3. 跳转到登录页面

```js
const onClickLogout = () => {
  dispatch(clearUserInfo());
  navigate("/login");
};
```
