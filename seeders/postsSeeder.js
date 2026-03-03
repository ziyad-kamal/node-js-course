import { faker } from "@faker-js/faker";
import Post from "./../app/models/Post.js";

const seedPosts = async (count = 30, userIds = []) => {
    try {
        await Post.deleteMany({});
        console.log("🗑️  Cleared existing posts");

        if (userIds.length === 0) {
            throw new Error("No user IDs provided for posts");
        }

        const posts = [];

        for (let i = 0; i < count; i++) {
            const randomDate = faker.date.past({ years: 1 });
            posts.push({
                title: faker.lorem.sentence({ min: 4, max: 10 }),
                content: faker.lorem.paragraphs({ min: 2, max: 5 }),
                author: faker.helpers.arrayElement(userIds),
                image: "https://www.pexels.com/photo/photo-of-gray-surface-3377405/",
                tags: faker.helpers.arrayElements(
                    [
                        "javascript",
                        "nodejs",
                        "react",
                        "mongodb",
                        "express",
                        "typescript",
                        "programming",
                    ],
                    { min: 1, max: 4 },
                ),
                likeCount: faker.number.int({ min: 0, max: 120 }),
                createdAt: randomDate, // ✅ random date within last 1 year
                updatedAt: randomDate, // ✅ random date within last 1 year
            });
        }

        const createdPosts = await Post.insertMany(posts);
        console.log(`✅ Created ${createdPosts.length} posts`);

        return createdPosts;
    } catch (err) {
        console.error("Posts seeding failed:", err.message);
        throw err;
    }
};

export default seedPosts;
