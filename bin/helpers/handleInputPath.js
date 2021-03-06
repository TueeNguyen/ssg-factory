const fs = require("fs").promises;
const path = require("path");
const nodeDir = require("node-dir");
/**
 * - HandleInputPath handles the filePath checking if it's a file or a folder
 * - If the filePath is a file with extension of ".txt" or ".md" => return the data of the file
 * - If the filePath is a folder => return a Promise with a response of an array of file paths inside the folder
 */
class HandleInputPath {
  constructor(filePath) {
    this.filePath_ = filePath;
    this.result_ = null;
    this.ext_ = null;
  }
  setFilePath = (filePath) => {
    this.filePath_ = filePath;
  };
  /**
   *
   * @returns a Promise object
   */
  readFile = async () => {
    try {
      return fs.readFile(this.filePath_, "utf-8");
    } catch (err) {
      console.log(require("chalk").yellow(`${err}`));
      process.exit(1);
    }
  };
  /**
   *
   * @returns
   */
  getData = () => {
    return {
      ext: this.ext_,
      result: this.result_
    };
  };
  /**
   * Look for all files in a folder
   * @returns a Promise whose resolve is an array of files in the folder
   */
  readFolder = () => {
    return nodeDir.promiseFiles(this.filePath_); //a Promise of an array of file pahts in the folder
  };
  /**
   * Check for file extension, set this.result_ is set to Promise if folder, file data if ".txt" or ".md"
   */
  handleInput = () => {
    if (path.extname(this.filePath_) == ".txt") {
      this.result_ = this.readFile();
      this.ext_ = ".txt";
    } else if (path.extname(this.filePath_) == ".md") {
      this.result_ = this.readFile();
      this.ext_ = ".md";
    } else if (path.extname(this.filePath_) == "") {
      this.result_ = this.readFolder();
      this.ext_ = "folder";
    } else {
      console.error(require("chalk").red("Wrong file extension"));
      process.exit(1);
    }
  };
}

module.exports.HandleInputPath = HandleInputPath;
