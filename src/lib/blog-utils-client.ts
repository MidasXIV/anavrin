import blogs from "../blog-content/blogs.json";
import learnContent from "../blog-content/learnContent.json";

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

export const getCategories = () => learnContent.categories;

export const getAllBlogsWithinCategories = (category: string) =>
  learnContent.blogsWithinCategories[category];

export const getAllBlogsInLearnContent = (): Array<Blog> =>
  Object.keys(learnContent.blogsWithinCategories).reduce((accumulator, category) => {
    const blogsWithinCategories = learnContent.blogsWithinCategories[category]
      .filter((blog: Blog) => !blog.draft)
      .sort(
        (a: Blog, b: Blog) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    return accumulator.concat(blogsWithinCategories);
  }, []);
