import { getAllPosts } from "../repositories/postRepository.js";
import { getNextCursor, getQueryCursor } from "../utils/cursorPagination.js";
const getPosts = async (req) => {
    const limit = 10;
    const { query, sortField } = getQueryCursor(req, "createdAt");

    const posts = await getAllPosts(query, limit);
    // prettier-ignore
    const { hasMore, nextCursor, results } = getNextCursor(posts,limit,sortField);

    return { metaData: { hasMore, nextCursor }, posts: results };
};

export { getPosts };
