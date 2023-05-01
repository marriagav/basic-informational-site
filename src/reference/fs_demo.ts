import fs from "fs";
import path from "path";

// Create folder
fs.mkdir(path.join(__dirname, "/test"), {}, (e) => {
  if (e) throw e;
  console.log("Folder created...");
});

// Create and write to file
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello World!",
  (e) => {
    if (e) throw e;
    console.log("File written to...");

    // Append to a file
    fs.appendFile(
      path.join(__dirname, "/test", "hello.txt"),
      " I love Node.js",
      (e) => {
        if (e) throw e;
        console.log("File written to...");
      }
    );
  }
);

// Read file
fs.readFile(path.join(__dirname, "/test", "hello.txt"), "utf8", (e, data) => {
  if (e) throw e;
  console.log(data);
});

// Rename file
fs.rename(
  path.join(__dirname, "/test", "hello.txt"),
  path.join(__dirname, "/test", "helloWorld.txt"),
  (e) => {
    if (e) throw e;
    console.log("File renamed...");
  }
);
