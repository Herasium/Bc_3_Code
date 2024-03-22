const fs = require('fs');
const browserify = require('browserify');
const JSZip = require('jszip');
const crypto = require('crypto');
const sharp = require('sharp');

const inputFilePath = './src/main.js';
const outputBundlePath = 'bundle.js';
const outputZipPath = 'output.zip';
const outputTxtPath = 'output.txt';
const outputFolder = `build`;  // Use current timestamp to create a unique folder
const outputHtmlPath = `${outputFolder}/index.html`;  // Output HTML path inside the created folder
const outputAssetsPath = `${outputFolder}/assets`;  // Output assets folder path

// Browserify bundle
const bundleStream = browserify(inputFilePath).bundle();
let file = '';

bundleStream.on('data', (chunk) => {
  file += chunk.toString('utf8');
});
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

if (!fs.existsSync(outputAssetsPath)) {
  fs.mkdirSync(outputAssetsPath);
}

bundleStream.on('end', () => {
  console.log('Browserify complete.');

  // Create JSZip instance
  const zip = new JSZip();
  zip.file(outputBundlePath, file);

  // Read assets from src/assets folder and add them to the zip
  const inputDirectory = './src/assets';
  const outputDirectory = outputAssetsPath;
  
  // Maximum width and height for resizing
  const maxWidth = 800;
  const maxHeight = 600;
  
  // Ensure the output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
  
  // List all files in the input directory
  const files = fs.readdirSync(inputDirectory);
  
  // Loop through each file and apply advanced compression techniques
  files.forEach((file) => {
    if (file.match(/\.(jpg|jpeg|png)$/)) {
      sharp(`${inputDirectory}/${file}`)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, progressive: true }) // Progressive JPEGs
        .webp({ quality: 80 }) // Convert to WebP format
        .toFile(`${outputDirectory}/${file}`, (err, info) => {
          if (err) {
            console.error(`Error processing ${file}: ${err}`);
          } else {
            console.log(`Advanced compression applied to ${file}`);
          }
        });
    }
  });

  const assets = fs.readdirSync(inputDirectory);

  assets.forEach((asset) => {
    if (asset.match(/\.(svg)$/)) {
      const assetPath = `${inputDirectory}/${asset}`;
      const stats = fs.statSync(assetPath);

      if (stats.isFile()) {
        const assetContent = fs.readFileSync(assetPath);
        fs.writeFileSync(`${outputAssetsPath}/${asset}`, assetContent);
      } else if (stats.isDirectory()) {
        const files = fs.readdirSync(assetPath);
        files.forEach((file) => {
          const filePath = `${assetPath}/${file}`;
          const fileContent = fs.readFileSync(filePath);
          fs.writeFileSync(`${outputAssetsPath}/${file}`, fileContent);
        });
      }
    }
  });

  // Generate the zip asynchronously
  zip.generateAsync({ type: 'nodebuffer' })
    .then((outputZipContent) => {
      // Create the build folder if it doesn't exist

      // Write the zip file
      fs.writeFileSync(`${outputFolder}/${outputZipPath}`, outputZipContent);
      console.log('Zip creation complete.');

      // Read content from bundle.js
      const outputTxtContent = fs.readFileSync(outputBundlePath, 'utf8');
      const base64ZipContent = fs.readFileSync(`${outputFolder}/${outputZipPath}`).toString('base64');

      // Generate hashes
      const hashTxt = crypto.createHash('sha256').update(outputTxtContent).digest('hex');
      const hashZip = crypto.createHash('sha256').update(outputZipContent).digest('hex');
      const hashBase = crypto.createHash('sha256').update(base64ZipContent).digest('hex');

      // Create content for output.txt
      const outputContent = `Hash of bundle.js: ${hashTxt}\nHash of output.zip: ${hashZip}\nHash of output, base64 encoded: ${hashBase}\n\nActual script:\n\n${base64ZipContent}`;
      fs.writeFileSync(`${outputFolder}/${outputTxtPath}`, outputContent, 'utf8');

      // Create content for output.html
      const outputHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlockCoin</title>
  <script src="https://stuk.github.io/jszip/dist/jszip.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <meta property="og:title" content="Blockcoin" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://blockcoin.social" />
  <meta property="og:image" content="https://blockcoin.social/assets/logo.png" />
  <meta property="og:description" content="Blockcoin is a new social media built around a fictionnal currency that you can earn by posting!" />
  <meta name="theme-color" content="#BB01FF" />
  <meta name="description" content="Blockcoin is a new social media built around a fictionnal currency that you can earn by posting!" />
  <script src="https://www.google.com/recaptcha/api.js?render=6Lf1n4IoAAAAAEXFEel1BfkxHrcuzJUJNfPiFA3q"></script>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<noscript>Blockcoin Needs Javascript to run. Please enable Javascript then refesh your page.</noscript>
<script>
  var zipContent = "${base64ZipContent}"; // Insert the base64 content here
  var zip = new JSZip();
  zip.loadAsync(zipContent, { base64: true })
    .then(function (zip) {
      zip.files['bundle.js'].async("string")
        .then(function(string){eval(string)})
        console.log("Runned Blockcoin, Revision 1")
    })
    .catch(function (error) {
      console.error("Error unzipping and executing JS:", error," Please refresh the page or contact @Herasium");
    });
</script>
<style>        
.grecaptcha-badge {
  visibility: hidden !important;
}
</style>
</body>
</html>`;

      // Write content to output.html
      fs.writeFileSync(outputHtmlPath, outputHtmlContent, 'utf8');
      console.log(`HTML content written to ${outputHtmlPath}.`);
    })
    .catch((error) => {
      console.error('Error during ZIP creation:', error);
    });
});
