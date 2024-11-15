const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app (the 'build' folder)
app.use(express.static(path.join(__dirname, 'build')));

// Serve PDF files from the 'public' folder
app.get('/download-pdf', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'files', 'sample.pdf');
  res.download(filePath, 'SampleFile.pdf', (err) => {
    if (err) {
      console.error('Error during file download:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// Catch-all handler to serve the React app's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});