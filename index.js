import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const markCommit = (x, y) => {
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .format();

    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }).push();
    });
};

const makeCommits = (n) => {
    if (n === 0) return simpleGit().push();
    const x = randomInt(0, 54);
    const y = randomInt(0, 6);
    const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

    const data = {
        date: date,
    };
    console.log(date);
    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
    });
};

makeCommits(100);
