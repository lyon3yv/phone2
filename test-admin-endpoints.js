import fetch from "node-fetch";

async function adminLogin(username, password) {
  const response = await fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Admin login failed");
  }
  const data = await response.json();
  return data.admin.id;
}

async function generateCodes(adminId, appType, count = 1) {
  const response = await fetch("http://localhost:5000/api/admin/codes/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminId, appType, count }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Failed to generate codes: " + errorData.message);
  }
  const data = await response.json();
  return data.codes;
}

async function main() {
  try {
    const username = "admin";
    const password = "SecureAdminPass123!";
    const adminId = await adminLogin(username, password);
    console.log("Admin logged in with ID:", adminId);

    const appType = "instagram";
    const codes = await generateCodes(adminId, appType, 1);
    console.log("Generated codes:", codes);
  } catch (error) {
    console.error(error);
  }
}

main();
