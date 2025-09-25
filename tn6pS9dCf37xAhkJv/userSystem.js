// userSystem.js
let currentUser = null;

// --- Registration ---
function register() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("⚠️ Enter a username and password.");
    return;
  }

  if (localStorage.getItem("user_" + user)) {
    alert("❌ Username already exists!");
    return;
  }

  let data = {
    password: pass,
    score: 0,
    achievements: []
  };

  localStorage.setItem("user_" + user, JSON.stringify(data));
  alert("✅ Registered! Please log in.");
}

// --- Login ---
function login() {
  let user = document.getElementById("loginUser").value.trim();
  let pass = document.getElementById("loginPass").value.trim();

  let stored = localStorage.getItem("user_" + user);
  if (!stored) {
    alert("❌ User not found.");
    return;
  }

  let data = JSON.parse(stored);
  if (data.password !== pass) {
    alert("❌ Wrong password.");
    return;
  }

  currentUser = user;
  alert("✅ Welcome back, " + user + "!");

  document.getElementById("auth").style.display = "none";
  document.getElementById("game").style.display = "block";

  loadUserData();
}

// --- Load user data into game ---
function loadUserData() {
  if (!currentUser) return;
  let data = JSON.parse(localStorage.getItem("user_" + currentUser));
  window.playerScore = data.score || 0;
  window.playerAchievements = data.achievements || [];
  console.log("Loaded:", data);
}

// --- Save progress ---
function saveProgress(score, achievement) {
  if (!currentUser) return;
  let data = JSON.parse(localStorage.getItem("user_" + currentUser));

  // keep highest score
  data.score = Math.max(data.score, score);

  // add achievement
  if (achievement && !data.achievements.includes(achievement)) {
    data.achievements.push(achievement);
  }

  localStorage.setItem("user_" + currentUser, JSON.stringify(data));
}

// --- Logout ---
function logout() {
  currentUser = null;
  document.getElementById("auth").style.display = "block";
  document.getElementById("game").style.display = "none";
}
