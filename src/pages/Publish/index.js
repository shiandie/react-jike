import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import { useState, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
  // 频道列表
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function getChannels() {
      const res = await http.get("/channels");
      setChannels(res.data.channels);
    }
    getChannels();
  }, []);
  //收集表单数据
  const onFinishForm = async (values) => {
    // console.log("Success:", values);
    const { title, channel_id, content } = values;
    const params = {
      title, // 标题
      channel_id, // 频道id
      content, // 内容
      type: 1,
      cover: {
        type: radioValue, //封面类型
        images: imageList.map((item) => item.response.data.url), //图片地址
      },
    };
    await http.post("/mp/articles?draft=false", params);
    message.success("发布文章成功");
    console.log(params);
  };
  //图片上传
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (info) => {
    setImageList(info.fileList);
  };
  const [radioValue, setRadioValue] = useState(0);
  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div className="publish">
      <Form.Item
        label="频道"
        name="channel_id"
        rules={[{ required: true, message: "请选择文章频道" }]}
      >
        <Select placeholder="请选择文章频道" style={{ width: 200 }}>
          {channels.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="封面">
        <Form.Item name="type">
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <Radio value={1}>单图</Radio>
            <Radio value={3}>三图</Radio>
            <Radio value={0}>无图</Radio>
          </Radio.Group>
        </Form.Item>
        {radioValue > 0 && (
          <Upload
            name="image"
            listType="picture-card"
            showUploadList
            action={"http://geek.itheima.net/v1_0/upload"}
            onChange={onUploadChange}
            maxCount={radioValue}
          >
            <div style={{ marginTop: 8 }}>
              <PlusOutlined />
            </div>
          </Upload>
        )}
      </Form.Item>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/home"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          onFinish={onFinishForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
              <Option value={0}>推荐</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <Input.TextArea
              placeholder="请输入文章内容"
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
