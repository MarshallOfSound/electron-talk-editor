const electron = require('electron');
const fs = require('fs');
const loader = require('monaco-loader');

loader().then((monaco) => {
  let editor = monaco.editor.create(document.getElementById('container'), {
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
  });

  electron.ipcRenderer.on('load-dis-file', (event, url) => {
    const data = fs.readFileSync(url.substr(7), 'utf8');
    
    editor.setModel(monaco.editor.createModel(data, 'javascript'));

    const path = electron.remote.dialog.showSaveDialog();
    fs.writeFileSync(path, data);
  });
});