import { http } from "@/utils";
//获取文章列表
export const getArticleListAPI = (params) => {
  return http({
    url: "/mp/articles",
    methodL: "GET",
    params,
  });
};
