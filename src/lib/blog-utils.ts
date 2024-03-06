import fs from "fs";
import path from "path";
import matter from "gray-matter";

import blogs from "../blog-content/blogs.json";
import authors from "../blog-content/authors.json";

const contentDirectory = path.join(process.cwd(), "src", "blog-content", "blogs");

/**
 * Retrieves a specific requested blog by slug.
 *
 * @param {string} slug - The slug of the requested blog.
 * @returns {Promise<Blog | null>} A promise that resolves to the requested blog or null if not found.
 */
const getRequestedBlog = async (slug: string): Promise<Blog | null> => {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const rawContent = fs.readFileSync(fullPath, "utf8");

  /** @type {{ data: { title: string, author: string }, content: string }} */
  const { data, content } = matter(rawContent);

  const blog = blogs.find((_blog: Blog) => _blog.slug === slug);
  if (!blog) {
    return null;
  }

  try {
    return {
      // data,
      content,
      ...blog,
      author: authors.find(author => author.username === blog.author) as unknown as string
    };
  } catch (e) {
    console.error(e);
  }

  return null;
};

export default getRequestedBlog;
