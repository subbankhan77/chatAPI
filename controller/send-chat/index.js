const saveDataInFile = require("../");
const path = require('path')
const send_message = async (req, res) => {
    const { message, msgType, sender, receiver, chatFile } = req.body
    const rootDir = path.dirname(require.main.filename);
    try {
        const Newdata = { msgType, message, sender: sender }
        if (msgType === 'text') {
            saveDataInFile(Newdata, chatFile)
            res.status(200).json({
                message: 'success',
                status: true
            })
        } else {
            const { file } = req?.files
            const fileMimeType = file.mimetype;
            const origin_name = file?.name.split(' ').join('-')
            const filename = `${new Date().getTime()}${origin_name}`
            let file_path = ''
            let saveFile = ''

            if (file?.length) {
                throw new Error('multiple files not allowed')
            }

            if (msgType === 'image') {
                const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                if (!allowedFileTypes.includes(fileMimeType)) {
                    throw new Error('only image files are allowed');
                }

                saveFile = path.join(rootDir, `public/image/${filename}`);
                file_path = `/image/${filename}`;
            }
            if (msgType === 'video') {
                const allowedFileTypes = ['video/mp4',];
                if (!allowedFileTypes.includes(fileMimeType)) {
                    throw new Error('only video files are allowed');
                }

                saveFile = path.join(rootDir, `public/video/${filename}`);
                file_path = `/chat/video/${filename}`;
            }
            if (msgType === 'audio') {
                const allowedFileTypes = ['audio/mpeg', 'audio/mp3'];
                if (!allowedFileTypes.includes(fileMimeType)) {
                    throw new Error('only audio files are allowed');
                }
                saveFile = path.join(rootDir, `public/audio/${filename}`);
                file_path = `/chat/audio/${filename}`;
            }
            if (msgType === 'pdf') {
                const allowedFileTypes = ['application/pdf'];
                if (!allowedFileTypes.includes(fileMimeType)) {
                    throw new Error('only pdf files are allowed');
                }
                saveFile = path.join(rootDir, `public/pdf/${filename}`);
                file_path = `/chat/pdf/${filename}`;
            }

            const Newdata = { msgType, message, sender: sender,  file: file_path }
            saveDataInFile(Newdata, chatFile)
            file.mv(saveFile);
            res.status(200).json({
                file: file_path,
                message: "success",
                status: true
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

module.exports = send_message