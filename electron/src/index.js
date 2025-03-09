/* eslint-disable @typescript-eslint/no-require-imports */
import { app, BrowserWindow, utilityProcess } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';


import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let server;

function getServerFilePath() {
  const serverFilePath = path.join(__dirname, './build/index.js');
  if (fs.existsSync(serverFilePath)) {
    return serverFilePath;
  } else {
    // Adjust the path for the packaged application
    return path.join(process.resourcesPath, 'build', 'index.js');
  }
}

function startServer() {
  const serverFilePath = getServerFilePath();
  console.log('Server file path:', serverFilePath);
  if (!fs.existsSync(serverFilePath)) {
    console.error('Server file not found:', serverFilePath);
    app.quit();
    return;
  }

  // Start the SvelteKit server (built with adapter-node)
  server = utilityProcess.fork(serverFilePath, [], {
    stdio: 'inherit', // Pipe the server's output to the main process
    env: { ...process.env,
      NODE_ENV: 'production', // Set the NODE_ENV to 'production
      PORT: '3000', // Set the port to 3000
      DEV_ADMIN_PASSWORD: 'admin', // Set the admin password,
      JWT_SECRET: 'jwt_secret' // Set the JWT secret
      
     } // Pass the environment variables to the server process
  });
  
  // Give the server some time to start up
  return new Promise(resolve => setTimeout(resolve, 1000));
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.

const createWindow = async () => {

  await startServer();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false, // Create the window hidden initially
    title: 'Inspection Assistant',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize(); // Maximize the window once it's ready to show
    mainWindow.show(); // Show the window
  });

  mainWindow.webContents.on('page-title-updated', (event) => {
    event.preventDefault(); // Stops Electron from updating the title
  });

  // Point to the built SvelteKit app
  mainWindow.loadURL('http://localhost:3000')

  mainWindow.setMenuBarVisibility(false);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (server) {
    server.kill();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
