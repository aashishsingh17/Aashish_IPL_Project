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
