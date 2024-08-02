import { createSlice } from "@reduxjs/toolkit";
import { getToken, http, setToken } from "@/utils";
const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: "" || getToken(),
  },
  // 同步修改方法
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload;
      setToken(action.payload);
    },
  },
});

// 解构出actionCreater
const { setUserToken } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);
    dispatch(setUserToken(res.data.token));
  };
};

export { fetchLogin };

export default userReducer;
