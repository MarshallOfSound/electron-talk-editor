const electron = require('electron');

electron.app.on('ready', () => {
  const window = new electron.BrowserWindow({
    titleBarStyle: 'hidden',
    frame: false
  });

  window.loadURL(`file://${__dirname}/index.html`);

  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();

    window.webContents.send('load-dis-file', url);
  });
});