import { connectDB } from "../config/index.js";
import seedComments from "./commentSeeder.js";
import seedPosts from "./postsSeeder.js";
import seedUsers from "./userSeeder.js";

const seedAll = async () => {
    try {
        await connectDB();

        console.log("🌱 Starting database seeding...");

        const createdUsers = await seedUsers(20);
        const userIds = createdUsers.map((user) => user._id);
        const createdPosts = await seedPosts(20, userIds);
        const postIds = createdPosts.map((post) => post._id);

        await seedComments(60, postIds, userIds);

        console.log("🎉 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedAll();
