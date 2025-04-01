import ReactMarkdown from "react-markdown";
import styles from "../index.module.css";

const BlogContent = ({ blog }) => {
  const { slug, title, author, content } = blog;
  return (
    <div>
      <article className="blog-border xs:w-full mx-auto border border-l border-r px-4 py-4 sm:w-1/2">
        <ReactMarkdown
          components={{ div: ({ children }) => <div className={styles.markdown}>{children}</div> }}
        >
          {content}
        </ReactMarkdown>
      </article>
      {/* <style jsx>{`
        .blog-border {
          border-left: 1px solid #eaeaea;
          border-right: 1px solid #eaeaea;
        }
      `}</style> */}
    </div>
  );
};

export default BlogContent;
