import latestVersion from "latest-version";
import chalk from "chalk";
import { VERSION } from "../config.js";

/**
 * Checks for updates to the package.
 */
export const isUpdated = async () => {
  try {
    const latest = await latestVersion("get-response-lite");
    if (latest !== VERSION) {
      console.log(
        `A new version of get-response-lite is available: ${chalk.yellow(
          latest
        )}. You are using version: ${chalk.red(
          VERSION
        )}.\n\nTo update, run: ${chalk.yellow(`npm i get-response-lite`)}`
      );
    }
  } catch (error) {
    console.error(chalk.red("Network error while checking for updates"));
  }
};

/**
 * Displays the current version message.
 */
export function versionMsg() {
  console.log(`
${chalk.bold("Installed version of")} ${chalk.bold.cyan(
    "get-response-lite"
  )} ${chalk.bold("is:")} ${chalk.yellow.bold(VERSION)}
  
To update to the latest version, run ${chalk.cyan(
    "npm i get-response-lite -g"
  )} in your terminal!!`);
}

/**
 * Detects the operating system.
 * @returns {string} OS name
 */
export function getOS() {
  const platform = process.platform.toLowerCase();
  const macosPlatforms = ["macos", "macintosh", "macintel", "macppc", "mac68k"];
  const windowsPlatforms = ["win32", "win64", "windows", "wince"];
  const iosPlatforms = ["iphone", "ipad", "ipod"];
  let os = null;
  if (macosPlatforms.indexOf(platform) !== -1) os = "Mac OS";
  else if (iosPlatforms.indexOf(platform) !== -1) os = "iOS";
  else if (windowsPlatforms.indexOf(platform) !== -1) os = "Windows";
  else if (/linux/.test(platform)) os = "Linux";
  return os;
}
