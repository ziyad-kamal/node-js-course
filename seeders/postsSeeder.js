import { faker } from "@faker-js/faker";
import Post from "../app/models/Post.js";

const seedPosts = async () => {
    try {
        // await Post.deleteMany({});
        // console.log("🗑️  Cleared existing posts");

        const posts = [];

        posts.push({
            title: "Admin Post",
            content: "admin@example.com",
            file: "image",
        });

        for (let i = 0; i < 20; i++) {
            posts.push({
                title: faker.lorem.words(2),
                content: faker.lorem.paragraphs(2),
                file: "image",
            });
        }

        const createdPosts = await Post.insertMany(posts);
        console.log(`✅ Created ${createdPosts.length} posts`);
    } catch (error) {
        console.error("Seeding posts failed:", error);
    }
};

export default seedPosts;
