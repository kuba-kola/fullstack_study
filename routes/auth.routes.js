const {Router, request} = require('express');
const User = require('../models/user');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router()

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Неправільны email').isEmail(),
        check('password', 'Мінімальная даўжыня пароля 6 сымбалеў').isLength({min:6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некарэктныя дадзеныя пры рэгістрацыі'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
           return res.status(400).json({message: 'Карыстальнік з такім email ужо зарэгістраваны'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: "Карыстальнік створаны!"})

    } catch (e) {
        res.status(500).json({message: 'Штосьці пайшло не так, паспрабуйце ізноў'});
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Увядзіце карэктны email').normalizeEmail().isEmail(),
        check('password', 'Увядзіце пароль').exists()
    ],
    async (req, res) => {
        try{
        const errors = validationResult(req)

        if(errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некарэктныя дадзеныя пры уваходзе ў сістэму'
            })
        }

        const{email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'Карыстальнік не знойдзены'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Неправільны пароль, паспрабуйце яшчэ'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            //далей указваем праз колькі наш токен перастане існаваць
            {expiresIn: '1h'}

        )

        res.json({token, userId:user.id})

    } catch (e) {
        res.status(500).json({message: 'Штосьці пайшло не так, паспрабуйце ізноў'});
    }
})

module.exports = router;