import { createSlice } from "@reduxjs/toolkit";
import { getToken, http, removeToken, setToken } from "@/utils";
const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: "" || getToken(),
    userInfo: {}, //用户信息
  },
  // 同步修改方法
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload;
      setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构出actionCreater
const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);
    dispatch(setUserToken(res.data.token));
  };
};
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
