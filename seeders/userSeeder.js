import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import User from "../app/models/User.js";

const seedUsers = async (count = 15) => {
    try {
        await User.deleteMany({});
        console.log("🗑️  Cleared existing users");

        const users = [];
        const userPassword = bcrypt.hashSync("ziyad1995", 12);

        users.push({
            username: "admin",
            email: "admin@example.com",
            password: userPassword,
            fullName: "Admin User",
            imagePath: "https://randomuser.me/api/portraits/men/1.jpg",
            bio: "I am the admin of this awesome platform",
            role: "admin",
        });

        const plainPassword = "12121212";
        const hashed = bcrypt.hashSync(plainPassword, 12);

        for (let i = 0; i < count; i++) {
            users.push({
                username: faker.person.firstName(),
                email: faker.internet.email(),
                password: hashed,
                fullName: faker.person.fullName(),
                imagePath: `https://randomuser.me/api/portraits/${
                    faker.datatype.boolean() ? "men" : "women"
                }/${faker.number.int({ min: 1, max: 99 })}.jpg`,
                bio: faker.lorem.sentence(5),
                role: "user",
            });
        }

        const createdUsers = await User.insertMany(users);
        console.log(`✅ Created ${createdUsers.length} users`);

        return createdUsers;
    } catch (err) {
        console.error("Users seeding failed:", err.message);
        throw err;
    }
};

export default seedUsers;
