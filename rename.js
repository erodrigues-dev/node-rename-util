const fs = require("fs");
const find = require("find");

const dir = process.argv[2];
const searchTherm = process.argv[3];
const renameTo = process.argv[4];

console.log(">> search files and directories in ", dir);

const regexSearch = new RegExp(`^.*(${searchTherm}).*$`, "i");
const regexReplace = new RegExp(searchTherm, "ig");

const directories = find.dirSync(regexSearch, dir);
console.log(`${directories.length} directories found`);
for (const directory of directories) {
  const directoryExists = fs.existsSync(directory);
  if (directoryExists) {
    const renamed = directory.replace(regexReplace, renameTo);
    fs.renameSync(directory, renamed);
    console.log(`>> rename: ${directory} to ${renamed}`);
  }
}

const files = find.fileSync(regexSearch, dir);
console.log(`${files.length} files found`);
for (const file of files) {
  const filesExists = fs.existsSync(file);
  if (filesExists) {
    const renamed = file.replace(regexReplace, renameTo);
    fs.renameSync(file, renamed);
    console.log(`>> rename: ${file} to ${renamed}`);
  }
}
