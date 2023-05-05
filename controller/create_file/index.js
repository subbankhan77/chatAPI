const path = require('path')
const { BASE_URL } = process.env
const fs = require('fs')
const new_chat_file = async (req, res) => {
    const { chatFile } = req.body
    try {
        const rootDir = path.dirname(require.main.filename);
        const file_path = path.join(rootDir, `public/store`)

        // Create directory if it doesn't exist
        if (!fs.existsSync(file_path)) {
            fs.mkdirSync(file_path, { recursive: true });
        }

        const OldMsg = await fs.writeFileSync(`${file_path}/${chatFile}.json`, JSON.stringify([]))
        res.status(200).json({
            message: 'success',
            status: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}
module.exports = new_chat_file
