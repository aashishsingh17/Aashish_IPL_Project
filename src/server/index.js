const csvFilePath = 'src/data/matches.csv'
import fs from 'fs';
import pkg from 'csvtojson';
const { csv } = pkg;

export function matchesPlayedPerYear() {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            var data1 = JSON.stringify(jsonObj, ['season']);
            var data2 = JSON.parse(data1);
            var matchesPerYear = new Object();
            for (var i = 0; i < data2.length; i++) {
                if (matchesPerYear.hasOwnProperty(data2[i]['season']) == false)
                    matchesPerYear[data2[i]['season']] = 1;
                else
                    matchesPerYear[data2[i]['season']] += 1;

            }

            fs.writeFileSync('src/public/output/matchesPerYear.json', JSON.stringify(matchesPerYear), 'utf-8');
        })
}


export function matchesWonPerTeamPerYear() {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            var data1 = JSON.stringify(jsonObj, ['season', 'winner']);
            var data2 = JSON.parse(data1);
            //console.log(data2);

            let obj = data2.reduce(function (output, current) {
                if (output.hasOwnProperty(current.winner)) {
                    if (output[current.winner].hasOwnProperty(current.season))
                        output[current.winner][current.season] = output[current.winner][current.season] + 1;
                    else
                        output[current.winner][current.season] = 1;
                } else {
                    output[current.winner] = {};
                    output[current.winner][current.season] = 1;
                }
                return output;
            }, {});
            //console.log(obj);  
            fs.writeFileSync('src/public/output/matchesWonPerYear.json', JSON.stringify(obj), 'utf-8');
        })
}

