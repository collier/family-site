const { spawnSync } = require('child_process');

const { 
  SERVER_IP, 
  SERVER_USER, 
  SERVER_APP_DIR, 
  LOCAL_PUBLIC_DIR, 
  LOCAL_DATA_DIR, 
  SERVER_APP_SERVICE_NAME 
} = process.env;

console.log('Deploying project...');
spawnSync('rsync', [
  '-avz',
  '.',
  `${SERVER_USER}@${SERVER_IP}:${SERVER_APP_DIR}`,
  '--exclude="/.git"',
  '--exclude="/.next"',
  '--exclude="/.vscode"',
  '--exclude="/node_modules"',
  '--exclude="/public"',
  '--exclude="/data"',
  '--exclude="/build"',
  '--exclude=".env.local"',
  '--exclude=".gitignore"',
  '--exclude=".prettierignore"',
  '--exclude=".prettierrc.json"',
  '--exclude="deploy.js"',
  '--exclude="README.md"',
  '--exclude="npm-debug.log*"',
], { shell: true });

console.log('Deploying public folder...');
spawnSync('rsync', [
  '-avz',
  `${LOCAL_PUBLIC_DIR}`,
  `${SERVER_USER}@${SERVER_IP}:${SERVER_APP_DIR}`,
]);

console.log('Deploying data folder...');
spawnSync('rsync', [
  '-avz',
  `${LOCAL_DATA_DIR}`,
  `${SERVER_USER}@${SERVER_IP}:${SERVER_APP_DIR}`,
]);

console.log('Clean install of node modules...');
spawnSync('ssh', [`${SERVER_USER}@${SERVER_IP}`, `cd ${SERVER_APP_DIR} ; npm ci`]);

console.log('Building production Next.js app...');
spawnSync('ssh', [`${SERVER_USER}@${SERVER_IP}`, `cd ${SERVER_APP_DIR} ; npm run build`]);

console.log('Restarting pm2 process...');
spawnSync('ssh', [`${SERVER_USER}@${SERVER_IP}`, `pm2 restart ${SERVER_APP_SERVICE_NAME}`]);

console.log('Deployment complete!');
