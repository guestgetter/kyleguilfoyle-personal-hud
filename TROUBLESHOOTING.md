# 🔧 Personal HUD Troubleshooting Guide

## 🚨 Server Won't Start? Follow This Checklist:

### 1. **Are you in the RIGHT directory?**
```bash
# ❌ WRONG - This will fail:
cd "/Users/kyleguilfoyle/Downloads/Personal HUD"
npm run dev

# ✅ CORRECT - This will work:
cd "/Users/kyleguilfoyle/Downloads/Personal HUD/personal-hud"
npm run dev
```

**Quick Check:** Run `ls` - you should see `package.json`, `app/`, `components/`, etc.

### 2. **Use the Quick Start Script (Recommended)**
```bash
# From anywhere, run:
cd "/Users/kyleguilfoyle/Downloads/Personal HUD/personal-hud"
./quick-start.sh
```

### 3. **Manual Startup (If script fails)**
```bash
cd "/Users/kyleguilfoyle/Downloads/Personal HUD/personal-hud"
pkill -f "next dev" 2>/dev/null || true
rm -rf .next node_modules/.cache
npm run dev
```

## 🔍 Common Error Messages & Solutions:

### Error: `Could not read package.json`
**Cause:** You're in the wrong directory
**Solution:** `cd "/Users/kyleguilfoyle/Downloads/Personal HUD/personal-hud"`

### Error: `MetricCard is not exported`
**Cause:** Build cache corruption
**Solution:** `rm -rf .next && npm run dev`

### Error: `Port 3000 is in use`
**Cause:** Another Next.js process is running
**Solution:** `pkill -f "next dev"` then restart

### Error: `Cannot find module './447.js'`
**Cause:** Webpack build corruption
**Solution:** `rm -rf .next node_modules/.cache && npm run dev`

## 🎯 Server URLs:

- **Main Page:** http://localhost:3000/open
- **Home:** http://localhost:3000/
- **API Test:** http://localhost:3000/api/media/book-cover?title=Test

## 📱 Quick Commands:

```bash
# Kill all Next.js processes
pkill -f "next dev"

# Clean everything and restart
rm -rf .next node_modules/.cache && npm run dev

# Check if server is running
ps aux | grep "next dev" | grep -v grep

# Test if server responds
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/open
```

## 🆘 When All Else Fails:

1. **Restart Terminal** - Sometimes shell state gets corrupted
2. **Reboot Computer** - Nuclear option for port conflicts
3. **Check Node Version** - Run `node --version` (should be 18+)
4. **Reinstall Dependencies** - `rm -rf node_modules && npm install`

## 🎮 Success Indicators:

When everything is working, you should see:
```
✓ Ready in 1185ms
○ Compiling /open ...
✓ Compiled /open in 3.6s (1712 modules)
GET /open 200 in 4071ms
```

**Your server is at:** http://localhost:3000/open 