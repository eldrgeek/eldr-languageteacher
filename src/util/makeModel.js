const makeModel = moduleName => {
  const srcFile = '/src/components/Template.jsx';
  const fs = require('fs');
  console.log(fs.writeFileSync);
  console.log(srcFile);
  let file = fs.readFileSync(srcFile).toString();
  // console.log(file);

  let modFile = file.replace(/Template/gm, moduleName);
  console.log(modFile);
};

makeModel('myFile');
