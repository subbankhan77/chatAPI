const path = require('path')
const fs = require('fs')
delete_msg = (req, res) => {
    try {
        const rootDir = path.dirname(require.main.filename);
        const file_path = path.join(rootDir, `public/store`)
        const { date, chatFile } = req?.body
        const fileData = fs.readFileSync(`${file_path}/${chatFile}.json`, 'utf8')
        const oldChat = JSON.parse(fileData)
        const receiveTime = new Date(date).getTime()
        const newList = oldChat.filter((curMessage) => {
            const existTime = new Date(curMessage?.time).getTime()
            if (receiveTime !== existTime) return curMessage
        })
        fs.writeFileSync(`${file_path}/${chatFile}.json`, JSON.stringify(newList))
        res.status(200).json({
            status: true,
            data: newList,
            message: 'delete message'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: [],
            message: error?.message
        })
    }
}
module.exports = delete_msg