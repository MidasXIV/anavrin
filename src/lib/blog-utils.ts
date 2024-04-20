import fs from "fs";
import path from "path";
import matter from "gray-matter";

import blogs from "../blog-content/blogs.json";
import learnContent from "../blog-content/learnContent.json";
import authors from "../blog-content/authors.json";

const blogContentDirectory = path.join(process.cwd(), "src", "blog-content", "blogs");
const learnContentDirectory = path.join(process.cwd(), "src", "blog-content", "learn");

/**
 * Retrieves a specific requested blog by slug.
 *
 * @param {string} slug - The slug of the requested blog.
 * @returns {Promise<Blog | null>} A promise that resolves to the requested blog or null if not found.
 */
export const getRequestedBlog = async (slug: string): Promise<Blog | null> => {
  const fullPath = path.join(blogContentDirectory, `${slug}.md`);
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

export const getRequestedLearnContent = async (
  category: string,
  slug: string
): Promise<Blog | null> => {
  const fullPath = path.join(learnContentDirectory, category, `${slug}.md`);
  const rawContent = fs.readFileSync(fullPath, "utf8");

  /** @type {{ data: { title: string, author: string }, content: string }} */
  const { data, content } = matter(rawContent);

  const blog = learnContent.blogsWithinCategories[category].find(
    (_blog: Blog) => _blog.slug === slug
  );
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
