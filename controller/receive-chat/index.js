const { BASE_URL } = process.env
const fs = require('fs')
const path = require('path')
const receive_message = async (req, res) => {
    const { chatFile } = req.body
    try {
        const rootDir = path.dirname(require.main.filename);
        const file_path = path.join(rootDir, `public/store`)
        const OldMsg = await fs.readFileSync(`${file_path}/${chatFile}.json`, 'utf8')
        res.status(200).json({
            message: 'success',
            status: true,
            domain: BASE_URL,
            data: JSON.parse(OldMsg)
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}
module.exports = receive_message