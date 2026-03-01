import { connectDB } from "../config/index.js";
import seedPosts from "./postsSeeder.js";

const seedAll = async () => {
    try {
        await connectDB();

        console.log("🌱 Starting database seeding...");

        await seedPosts();
        // await seedProducts();

        console.log("🎉 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedAll();
