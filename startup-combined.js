const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Prepare the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create Express server
  const server = express();
  
  // Import and use your backend routes
  const contactRoutes = require('./server/src/routes/contact.routes');
  const userRoutes = require('./server/src/routes/user.routes');
  const profileRoutes = require('./server/src/routes/profile.routes');
  const projectRoutes = require('./server/src/routes/project.routes');
  const technologyRoutes = require('./server/src/routes/technology.routes');
  
  // Serve static files
  const path = require('path');
  server.use('/uploads', express.static(path.join(__dirname, 'server/src/uploads')));
  
  // API routes (backend)
  server.use('/api/contact', contactRoutes);
  server.use('/api/users', userRoutes);
  server.use('/api/profiles', profileRoutes);
  server.use('/api/projects', projectRoutes);
  server.use('/api/technologies', technologyRoutes);
  
  // Health check
  server.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // Handle all other requests with Next.js (frontend)
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> API available at http://${hostname}:${port}/api`);
  });
}); 