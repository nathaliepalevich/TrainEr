const AuthService = require('./AuthService')

async function login(req, res) {
    const { phoneNum, password } = req.body

    try {
        const user = await AuthService.login(phoneNum, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

// async function signup(req, res) {

//     console.log('SIGN UP FROM CONTROLLERS', addedUser);
//     try {
//         const addedUser = req.body
//         const user = await AuthService.signup(addedUser)
//         req.session.user = user
//         res.json(user)
//     } catch (err) {
//         res.status(500).send({ error: 'could not signup, please try later' })
//     }
// }



module.exports = {
    login,
}