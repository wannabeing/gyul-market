import Layout from "@components/layout";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import { unified } from "unified";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";

interface PostProps {
  title: string;
  text: string;
}

const Post: NextPage<{ post: PostProps }> = ({ post }) => {
  return (
    <Layout canGoBack pageTitle={post.title} title={post.title}>
      <div className="mt-10 flex items-center justify-center px-5 font-bold">
        <div
          className="faq-text w-full text-center"
          dangerouslySetInnerHTML={{ __html: post.text }}
        />
      </div>
    </Layout>
  );
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  // staticpaths를 통해 얻은 파일명을 통해 해당 파일을 읽음
  const { content, data } = matter.read(`./posts/${context?.params?.slug}.md`);
  // html 변환
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      post: {
        title: data.title,
        text: value,
      },
    },
  };
};

export default Post;
