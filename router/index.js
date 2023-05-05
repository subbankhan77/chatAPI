const { Router } = require('express')
const receive_message = require('../controller/receive-chat')
const send_message = require('../controller/send-chat')
const new_chat_file = require('../controller/create_file')
const delete_msg = require('../controller/delete_msg')
const router = Router()
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'wellcome to Query Boat',
        status: true,
        data: []
    })
})

// chat API 
router.post('/create_newChat_File', new_chat_file)
router.post('/send_message', send_message)
router.post('/get_chat', receive_message)
router.post('/delete_message', delete_msg)


module.exports = router