const fs = require('fs')
const path = require('path')
const saveDataInFile = (Newdata, chatFile) => {
    const rootDir = path.dirname(require.main.filename);
    const file_path = path.join(rootDir, `public/store`)
    fs.readFile(`${file_path}/${chatFile}.json`, 'utf8', (err, data) => {
        if (err) {
            fs.writeFile(`${file_path}/${chatFile}.json`, `${JSON.stringify([Newdata])}`, (error) => {
            })
        } else {
            const OldMsg = JSON.parse(data)
            fs.writeFile(`${file_path}/${chatFile}.json`, `${JSON.stringify([...OldMsg, Newdata])}`, (error) => {
                // console.log(error)
            })
        }
    });
    return true
}
module.exports = saveDataInFile