const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Vendor = require("../models/Vendor");

dotenv.config();

const sampleVendors = [
  {
    name: "Tech Solutions Inc",
    email: "sales@techsolutions.example.com",
    phone: "+1-555-0101",
    company: "Tech Solutions Inc",
    specialization: "IT Hardware & Software",
  },
  {
    name: "Office Supplies Pro",
    email: "orders@officesupplies.example.com",
    phone: "+1-555-0102",
    company: "Office Supplies Pro",
    specialization: "Office Equipment & Furniture",
  },
  {
    name: "Global Electronics",
    email: "rfp@globalelectronics.example.com",
    phone: "+1-555-0103",
    company: "Global Electronics Ltd",
    specialization: "Consumer Electronics",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Vendor.deleteMany({});
    console.log("Cleared existing vendors");

    await Vendor.insertMany(sampleVendors);
    console.log("Sample vendors added successfully!");

    console.log("\nSample Vendors:");
    const vendors = await Vendor.find();
    vendors.forEach((v) => {
      console.log(`- ${v.name} (${v.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
