import fs from 'fs'
const first = () => {
    const regex = /mul\([0-9]+,[0-9]+\)/g;
    const res = [...fs.readFileSync('inputs/input3.txt', 'utf-8').matchAll(regex)]
        .map(
            (elem) => [...elem[0].matchAll(/[0-9]+/g)]
                .map(match => Number(match[0]))
        ).reduce((acc, current) => acc + current[0] * current[1], 0)
    return res;
}

const isInDoRange = (doMatches, mulEntry) => {
    console.log(doMatches);
    console.log(mulEntry);
}

const second = () => {
    const mulRegex = /mul\([0-9]+,[0-9]+\)/g;
    const doRegex = /do()/g;
    const dontRegex = /don't()/g;

    const file = fs.readFileSync('inputs/input3.txt', 'utf-8');
    const doAndDonts = [...file.matchAll(doRegex), ...file.matchAll(dontRegex)]
        .sort((a,b) => a.index - b.index)
        map((elem) => [elem[0], elem[2]]);
    const res = [...file.matchAll(mulRegex)]
        .filter((entry) => isInDoRange(doAndDonts, entry))
        .map(
            (elem) => [...elem[0].matchAll(/[0-9]+/g)]
                .map(match => Number(match[0]))
        ).reduce((acc, current) => acc + current[0] * current[1], 0)
    return res;
}

export default { first, second };