const getQueryCursor = (req, sortField) => {
    const cursor = req.query.cursor;
    const query = {};

    if (cursor) {
        query[sortField] = { $lt: new Date(cursor) };
    }

    return { sortField, query };
};

const getNextCursor = (posts, limit, sortField) => {
    const hasMore = posts.length > limit;
    const results = hasMore ? posts.slice(0, limit) : posts;

    const nextCursor = hasMore
        ? results[results.length - 1][sortField].toISOString()
        : null;

    return { hasMore, nextCursor, results };
};

export { getQueryCursor, getNextCursor };
