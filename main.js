const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false, // Don't use node.js in the renderer process
      contextIsolation: true, // Enable security for the renderer process
      preload: path.join(__dirname, 'preload.js') // Use preload.js for secure interaction with Node.js if needed
    }
  });

  win.loadFile('index.html'); // Make sure this points to the correct HTML file
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
