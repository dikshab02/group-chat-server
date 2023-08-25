
const session = require('express-session'); 

module.exports = {

    logout: (req,res) => {
        const sessionID = req.session.id;
        try {
            req.session.destroy();
            return res.send({
                isError: false,
                message: 'Logout successful',
                data: ''
            })
        }
        catch(error) {
            console.log('Error: ', error)
            res.status(500).json({
                isError: true,
                message: 'Server error',
                data: error.message
            })
        }
    }
    
}