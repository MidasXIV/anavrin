import blogs from "../blog-content/blogs.json";

/**
 * Retrieves all non-draft blogs and sorts them by updated date.
 *
 * @returns {Array<Blog>} Array of non-draft blogs sorted by updated date.
 */
export const getAllBlogs = (): Array<Blog> =>
  blogs
    .filter((blog: Blog) => !blog.draft)
    .sort((a: Blog, b: Blog) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

/**
 * Retrieves all featured blogs from the list of blogs.
 *
 * @returns {Array<Blog>} Array of featured blogs.
 */
export const getFeaturedBlogs = (): Array<Blog> =>
  getAllBlogs().filter((blog: Blog) => blog.featured);
