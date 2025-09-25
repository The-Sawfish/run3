let currentUser = null;
let lastSavedScore = 0;
let lastSavedAchievements = [];

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

  let data = { password: pass, score: 0, achievements: [] };
  localStorage.setItem("user_" + user, JSON.stringify(data));
  alert("✅ Registered! Please log in.");
}

// --- Login ---
function login() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  const user = JSON.parse(localStorage.getItem(username));
  if (user && user.password === password) {
    alert("Login successful!");
    showGame(); // <--- this loads the game
  } else {
    alert("Invalid username or password!");
  }
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

  // Start monitoring game progress
  monitorProgress();
}

// --- Load user data ---
function loadUserData() {
  if (!currentUser) return;
  let data = JSON.parse(localStorage.getItem("user_" + currentUser));
  window.playerScore = data.score || 0;
  window.playerAchievements = data.achievements || [];
  lastSavedScore = playerScore;
  lastSavedAchievements = [...playerAchievements];
  console.log("Loaded:", data);
}

// --- Save progress ---
function saveProgress(score, achievements) {
  if (!currentUser) return;
  let data = JSON.parse(localStorage.getItem("user_" + currentUser));

  data.score = Math.max(data.score, score);

  if (achievements) {
    achievements.forEach(a => {
      if (!data.achievements.includes(a)) {
        data.achievements.push(a);
      }
    });
  }

  localStorage.setItem("user_" + currentUser, JSON.stringify(data));
}

// --- Watch the game automatically ---
function monitorProgress() {
  setInterval(() => {
    let score = window.score || window.playerScore || 0;
    let achievements = window.achievements || window.playerAchievements || [];

    if (score !== lastSavedScore || achievements.length !== lastSavedAchievements.length) {
      saveProgress(score, achievements);
      lastSavedScore = score;
      lastSavedAchievements = [...achievements];
      console.log("💾 Auto-saved progress:", score, achievements);
    }
  }, 2000); // every 2 seconds
}

// --- Logout ---
function logout() {
  currentUser = null;
  document.getElementById("auth").style.display = "block";
  document.getElementById("game").style.display = "none";
}
