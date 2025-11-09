# 🚀 Git Setup and GitHub Push Guide

## Quick Setup (Windows)

Run the automated script:

```bash
.\push-to-github.bat
```

## Manual Setup

### Step 1: Initialize Git Repository

```bash
git init
```

### Step 2: Configure Git (if not already configured)

```bash
git config --global user.name "RajatSharma404"
git config --global user.email "your-email@example.com"
```

### Step 3: Create .gitignore (already created)

The `.gitignore` file is already set up to exclude:

- `node_modules/`
- `.env` files
- Database files (`*.db`)
- Build files
- Logs

### Step 4: Add All Files

```bash
git add .
```

### Step 5: Commit Changes

```bash
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API"
```

### Step 6: Create Repository on GitHub

1. Go to [GitHub New Repository](https://github.com/new)
2. Repository name: `weather-forecast-app` (or your preferred name)
3. Description: "Full-featured weather forecasting website with React frontend, Node.js backend, and Open-Meteo API"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 7: Add Remote and Push

```bash
# Add remote repository
git remote add origin https://github.com/RajatSharma404/weather-forecast-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Authentication

### Option 1: Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as password when pushing

### Option 2: SSH (Alternative)

1. Generate SSH key: `ssh-keygen -t ed25519 -C "your-email@example.com"`
2. Add SSH key to GitHub: Settings → SSH and GPG keys
3. Use SSH URL: `git remote add origin git@github.com:RajatSharma404/weather-forecast-app.git`

## Repository Information

- **GitHub Username**: RajatSharma404
- **Repository Name**: weather-forecast-app (or your choice)
- **Repository URL**: https://github.com/RajatSharma404/weather-forecast-app

## Files to be Pushed

✅ All source code
✅ Configuration files
✅ Documentation (README, SETUP, etc.)
✅ Package.json files

❌ Not pushed (in .gitignore):

- node_modules/
- .env files
- Database files
- Build files
- Logs

## After Pushing

1. Visit your repository: https://github.com/RajatSharma404/weather-forecast-app
2. Add repository description and topics
3. Consider adding a license file
4. Update README with badges if desired

## Troubleshooting

### "Repository not found"

- Make sure you created the repository on GitHub first
- Check the repository name matches

### "Authentication failed"

- Use Personal Access Token instead of password
- Or set up SSH authentication

### "Remote already exists"

```bash
git remote set-url origin https://github.com/RajatSharma404/weather-forecast-app.git
```

### "Nothing to commit"

- Make sure you've added files: `git add .`
- Check if files are in .gitignore

---

Happy coding! 🎉
