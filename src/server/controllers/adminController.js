const {
  checkIfAdmin,
  getAllUsers,
  addUser,
  deleteUser,
  getDashboardStats,
  logAdminAction,
  getAllReservations
} = require("../models/admin");

const { checkExistUser } = require("../models/user");

const { addDoctor, Alldoctors, deleteDoctor } = require("../models/doctors");

const { deleteReservation } = require("../models/reserve");


exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await checkIfAdmin(email);
    if (!admin) {
      return res.status(401).jsoncd ({ message: "Invalid admin credentials" });
    }

    const dbUser = await checkExistUser(email, password);
    if (!dbUser) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    await logAdminAction(admin.id, "ADMIN_LOGIN", { email }, req.ip);

    const adminData = {
      id: admin.id,
      firstName: admin.first_name,
      lastName: admin.last_name,
      email: admin.email,
      isAdmin: admin.is_admin,
    };

    res.json({ message: "Admin login successful", admin: adminData });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Error fetching dashboard statistics" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.addUser = async (req, res) => {
  const { firstName, lastName, email, password, isAdmin } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log('Received isAdmin from frontend:', isAdmin, typeof isAdmin);

    const adminFlag = isAdmin === true || isAdmin === 'true' ? true : false;

    console.log('adminFlag:', adminFlag);

    const newUser = await addUser(firstName, lastName, email, password, adminFlag);

    console.log('New user created with is_admin:', newUser.is_admin);

    await logAdminAction(
      req.adminId,
      "ADD_USER",
      {
        userId: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        isAdmin: newUser.is_admin
      },
      req.ip
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Add user error:", error);
    if (error.message.includes("duplicate key")) {
      res.status(409).json({ message: "User with this email already exists" });
    } else {
      res.status(500).json({ message: "Error creating user" });
    }
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found or cannot be deleted" });
    }

    await logAdminAction(
      req.adminId,
      "DELETE_USER",
      { userId, email: deletedUser.email },
      req.ip
    );

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

exports.getAllReservations = async (req, res) => {
  try {

    const result = await getAllReservations();
    res.json(result.rows);
  } catch (error) {
    console.error("Get reservations error:", error);
    res.status(500).json({ message: "Error fetching reservations" });
  }
};

exports.deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    const deleted = await deleteReservation(reservationId);
    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await logAdminAction(
      req.adminId,
      "DELETE_RESERVATION",
      { reservationId },
      req.ip
    );

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Delete reservation error:", error);
    res.status(500).json({ message: "Error deleting reservation" });
  }
};


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Alldoctors();
    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
};


exports.addDoctor = async (req, res) => {
  const { firstName, lastName, specialty } = req.body;

  if (!firstName || !lastName || !specialty) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDoctor = await addDoctor(firstName, lastName, specialty);

   
    await logAdminAction(
      req.adminId,
      "ADD_DOCTOR",
      {
        doctorId: newDoctor.id,
        firstName: newDoctor.first_name,
        lastName: newDoctor.last_name,
        specialty: newDoctor.specialty,
      },
      req.ip
    );

    res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Add doctor error:", error);
    if (error.message.includes("duplicate key")) {
      res
        .status(409)
        .json({ message: "Doctor with this information already exists" });
    } else {
      res.status(500).json({ message: "Error adding doctor" });
    }
  }
};


exports.deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const deletedDoctor = await deleteDoctor(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }


    await logAdminAction(
      req.adminId,
      "DELETE_DOCTOR",
      {
        doctorId,
        firstName: deletedDoctor.first_name,
        lastName: deletedDoctor.last_name,
        specialty: deletedDoctor.specialty,
      },
      req.ip
    );

    res.json({ message: "Doctor deleted successfully", doctor: deletedDoctor });
  } catch (error) {
    console.error("Delete doctor error:", error);
    res.status(500).json({ message: "Error deleting doctor" });
  }
};

exports.addAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAdmin = await addUser(firstName, lastName, email, password, true);

    await logAdminAction(
      req.adminId,
      "ADD_ADMIN",
      {
        adminId: newAdmin.id,
        email: newAdmin.email,
        firstName: newAdmin.first_name,
        lastName: newAdmin.last_name,
      },
      req.ip
    );

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error("Add admin error:", error);
    if (error.message.includes("duplicate key")) {
      res.status(409).json({ message: "Admin with this email already exists" });
    } else {
      res.status(500).json({ message: "Error creating admin" });
    }
  }
};


exports.verifyAdmin = async (req, res, next) => {

  const adminEmail =
    req.headers["x-admin-email"] || req.headers.authorization?.split(" ")[1];

  if (!adminEmail) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  try {
    const admin = await checkIfAdmin(adminEmail);

    if (!admin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.adminId = admin.id;
    req.adminEmail = admin.email;
    next();
  } catch (error) {
    console.error("Admin verification error:", error);
    res.status(401).json({ message: "Invalid admin authentication" });
  }
};
