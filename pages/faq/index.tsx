import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface PostProps {
  title: string;
  category: string;
  slug: string;
}

const faq: NextPage<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <Layout title="FAQ" pageTitle="FAQ">
      <div className="mt-10 px-5">
        {posts.map((post, i) => (
          <Link href={`/faq/${post.slug}`} key={i}>
            <a>
              <div className="flex items-center justify-between rounded-md border-b p-3 py-5 transition hover:bg-gray-200">
                <span className="font-bold">{post.title}</span>
                <span className="text-sm">{post.category}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = readdirSync("./posts").map((post) => {
    const readPost = readFileSync(`./posts/${post}`, "utf-8");
    // 이름과 확장자명 분리
    const [slug, _] = post.split(".");
    // md파일을 객체로 변환한걸 return
    return { ...matter(readPost).data, slug };
  });
  return {
    props: {
      posts,
    },
  };
}

export default faq;
