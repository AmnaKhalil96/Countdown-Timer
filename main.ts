#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(chalk.magenta`\n  \t\t <<<================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>        ${chalk.bgBlackBright.bold('  Welcome To \"SAM\" - Countdown-Timer')}              <<<=========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(chalk.magenta`\t\t <<<================================================>>>`));

async function startTimer() {
    console.log(chalk.blue("Welcome to the \"SAM\" - Countdown-Timer!"));

    const prompt = inquirer.createPromptModule();
    const res = await inquirer.prompt(
        [
            {
                name: "userInput",
                type: "number",
                message:chalk.green("Please enter the amount of seconds"),
                validate: (input) => {
                    if (isNaN(input)) {
                        return chalk.redBright("Please enter a valid number");
                    } else if (input > 60) {
                        return "Seconds must be within 60";
                    } else {
                        return true;
                    }
                }
            }
        ]
    );

    let input = res.userInput;

    function startTime(val: number) {
        const intTime = new Date().setSeconds(new Date().getSeconds() + val);
        const intervalTime = new Date(intTime);
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const timeDiff = differenceInSeconds(intervalTime, currentTime);

            if (timeDiff <= 0) {
                console.log (chalk.red("Timer has expired!"));
                clearInterval(intervalId);
                askToRetry();
            } else {
                const min = Math.floor((timeDiff % 3600) / 60);
                const sec = Math.floor(timeDiff % 60);
                console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
            }
        }, 1000);
    }

    async function askToRetry() {
        const replay = await inquirer.prompt([
            {
                name: "replay",
                type: "confirm",
                message: chalk.yellow("Do you want to set another timer?\n"),
            },
        ]);

        if (replay.replay) {
            startTimer();
        } else {
            console.log(chalk.magentaBright("Thank you for using the \"SAM\" - Countdown-Timer!"));
            process.exit();
        }
    }

    startTime(input);
}

startTimer();



