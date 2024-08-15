// import "reflect-metadata";
import app from "./app";
import connectDB from "./config/db";
import createSuperAdmin from "./utils/createSuperAdmin";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    await createSuperAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server start error:", error);
  }
};
startServer();
