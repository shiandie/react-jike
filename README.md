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
