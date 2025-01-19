window.addEventListener('DOMContentLoaded', () => {
    // Safe interaction with Node.js API
    const version = process.versions.node;
    document.getElementById('node-version').innerText = version;
  });
  