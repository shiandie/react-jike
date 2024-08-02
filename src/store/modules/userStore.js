import { http } from "@/utils/request";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});
//解构出action
const { setUserInfo } = userStore.actions;
//获取reducer
const userReducer = userStore.reducer;
//异步方法封装
const fetchLogin = (data) => {
  return async (dispatch) => {
    //异步请求
    const res = await http.post("authorizations", data);
    //请求成功后调用dispatch
    dispatch(setUserInfo(res.data.token));
  };
};
export { fetchLogin };
export default userReducer;
