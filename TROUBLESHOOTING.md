# 🔧 Troubleshooting: Repository Not Showing on GitHub

## Quick Fix

Run the diagnostic and fix script:
```bash
.\fix-and-push.bat
```

## Common Issues and Solutions

### Issue 1: Repository Not Created on GitHub

**Symptoms:** Push fails with "repository not found"

**Solution:**
1. Go to https://github.com/new
2. Create repository named: `weather-forecast-app`
3. **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"
5. Try pushing again

### Issue 2: Authentication Failed

**Symptoms:** Push fails with "authentication failed" or "access denied"

**Solution:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Weather App")
4. Select scope: `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use:
   - Username: `RajatSharma404`
   - Password: Your Personal Access Token

### Issue 3: Nothing to Push

**Symptoms:** "Everything up-to-date" but repo is empty on GitHub

**Solution:**
```bash
# Check if files are committed
git log --oneline

# If no commits, commit first
git add .
git commit -m "Initial commit: Weather Forecast App"

# Then push
git push -u origin main
```

### Issue 4: Remote Not Set

**Symptoms:** "fatal: no upstream branch" or "remote not found"

**Solution:**
```bash
# Remove existing remote (if any)
git remote remove origin

# Add correct remote
git remote add origin https://github.com/RajatSharma404/weather-forecast-app.git

# Verify remote
git remote -v

# Push again
git push -u origin main
```

### Issue 5: Branch Name Mismatch

**Symptoms:** Push fails or wrong branch

**Solution:**
```bash
# Rename branch to main
git branch -M main

# Push to main
git push -u origin main
```

## Step-by-Step Fix

### Step 1: Check Current Status

Run diagnostic:
```bash
.\check-git-status.bat
```

Or manually:
```bash
git status
git remote -v
git log --oneline -5
```

### Step 2: Verify Repository Exists on GitHub

1. Go to: https://github.com/RajatSharma404?tab=repositories
2. Check if `weather-forecast-app` exists
3. If not, create it at: https://github.com/new

### Step 3: Re-initialize and Push

```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/RajatSharma404/weather-forecast-app.git

# Ensure all files are added
git add .

# Commit (if needed)
git commit -m "Initial commit: Weather Forecast App with Open-Meteo API"

# Set branch to main
git branch -M main

# Push with force (if repository is empty on GitHub)
git push -u origin main --force
```

## Verify Push Was Successful

1. **Check GitHub:** https://github.com/RajatSharma404/weather-forecast-app
2. **Check files:** You should see all project files
3. **Check commits:** You should see at least one commit

## Manual Verification Commands

```bash
# Check remote URL
git remote get-url origin

# Check if remote exists
git remote -v

# Check commits
git log --oneline

# Check branch
git branch

# Check status
git status

# Try pushing again
git push -u origin main
```

## Force Push (Use with Caution)

If the repository exists but is empty or has different content:

```bash
# Force push (overwrites remote)
git push -u origin main --force
```

**Warning:** Only use `--force` if you're sure you want to overwrite the remote repository.

## Still Not Working?

### Check These:

1. ✅ Git is installed: `git --version`
2. ✅ Repository exists on GitHub
3. ✅ Remote URL is correct: `git remote -v`
4. ✅ Files are committed: `git log`
5. ✅ Branch is main: `git branch`
6. ✅ Authentication works (Personal Access Token)

### Get Help:

1. Check error messages carefully
2. Verify repository exists: https://github.com/RajatSharma404/weather-forecast-app
3. Try creating a new repository with a different name
4. Check GitHub status: https://www.githubstatus.com/

## Alternative: Create Repository via GitHub CLI

If you have GitHub CLI installed:

```bash
# Install GitHub CLI first: https://cli.github.com/

# Authenticate
gh auth login

# Create repository and push
gh repo create weather-forecast-app --public --source=. --remote=origin --push
```

## Quick Reference

**Repository URL:** https://github.com/RajatSharma404/weather-forecast-app

**Create Repository:** https://github.com/new

**Personal Access Tokens:** https://github.com/settings/tokens

**GitHub Status:** https://www.githubstatus.com/

---

Run `.\fix-and-push.bat` for automated fix!

