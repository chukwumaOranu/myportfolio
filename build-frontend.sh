#!/bin/bash

echo "🚀 Building Oranu Portfolio Frontend..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out frontend-build

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build frontend for production
echo "🔨 Building frontend..."
npm run build

# Create frontend deployment folder
echo "📁 Creating frontend deployment package..."
mkdir -p frontend-build

# Copy frontend build
echo "📋 Copying frontend files..."
cp -r .next frontend-build/
cp -r public frontend-build/

# Copy configuration files
echo "📋 Copying configuration files..."
cp package.json frontend-build/
cp next.config.mjs frontend-build/
cp tailwind.config.ts frontend-build/
cp tsconfig.json frontend-build/

# Create vercel.json for Vercel deployment
echo "📋 Creating Vercel configuration..."
cat > frontend-build/vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://your-backend-domain.com/api"
  }
}
EOF

# Create netlify.toml for Netlify deployment
echo "📋 Creating Netlify configuration..."
cat > frontend-build/netlify.toml << EOF
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_PUBLIC_API_URL = "https://your-backend-domain.com/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# Create deployment instructions
echo "📋 Creating deployment instructions..."
cat > frontend-build/FRONTEND_DEPLOYMENT.md << EOF
# Frontend Deployment Instructions

## Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Frontend ready for deployment"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Set environment variable: \`NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api\`
   - Deploy!

## Option 2: Deploy to Netlify

1. **Upload this folder** to Netlify
2. **Set build command**: \`npm run build\`
3. **Set publish directory**: \`.next\`
4. **Add environment variable**: \`NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api\`

## Environment Variables

- \`NEXT_PUBLIC_API_URL\`: Your backend API URL (e.g., https://your-backend-domain.com/api)

## Backend Setup

Your backend should be deployed separately and accessible at the URL you set in \`NEXT_PUBLIC_API_URL\`.
EOF

echo "✅ Frontend build complete!"
echo "📁 Frontend package ready in 'frontend-build' folder"
echo "🌐 Deploy to Vercel or Netlify for best performance!" 