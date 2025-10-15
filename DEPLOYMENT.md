# 🚀 Vercel Deployment Guide

## Prerequisites

### Required Environment Variables
Set these in your Vercel dashboard or `.env.local`:

```bash
# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Gemini AI (Required)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Optional Variables
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_analytics_id
NEXT_PUBLIC_GEMINI_MODEL_ID=custom_model_id
```

## Deployment Steps

### 1. Prepare Your Repository

```bash
# Test build locally first
npm run build

# Check for any build errors
npm run lint
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

#### Option B: GitHub Integration
1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### 3. Configure Environment Variables

In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all required variables from `.env.example`
3. Redeploy if variables were missing

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Firebase project configured for production domain
- [ ] Gemini API key has sufficient quota
- [ ] Build completed successfully
- [ ] Error boundaries working
- [ ] Authentication flow tested
- [ ] AI recommendations functional

## Troubleshooting

### Build Failures
- Check environment variables are set correctly
- Verify Firebase configuration is valid
- Ensure Gemini API key is active

### Runtime Errors
- Check browser console for errors
- Verify all APIs are accessible from production domain
- Test authentication providers

### Performance Issues
- Enable compression in next.config.js ✅
- Optimize images and assets
- Use Vercel Analytics for monitoring

## Monitoring

- Use Vercel Analytics for performance metrics
- Monitor Firebase usage and quotas
- Track Gemini API usage and costs
- Set up error tracking (Sentry recommended)

## Security

- All sensitive data uses environment variables ✅
- No API keys exposed in client code ✅
- Security headers configured ✅
- Firebase security rules properly set

## Support

For deployment issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check this deployment guide

---

**Last Updated**: October 15, 2025
**Vercel Compatible**: ✅
**Production Ready**: ✅