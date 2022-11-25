const express = require('express')
const User = require('./model/user.js')
const router = new express.Router()
const { sendwelcome, deleteaccount } = require('./email/account')
const sharp = require('sharp')
const multer = require('multer')
const auth = require('./middleware/auth.js')
router.post('/users/signup', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    sendwelcome(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(404).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findbycrediantials(
      req.body.email,
      req.body.password,
    )
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.status(200).send({ user: req.user })
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send('LOGOUT SUCCESS')
  } catch (e) {
    res.status(500).send('ERROR')
  }
})

router.post('/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

/*
  router.get("/userfind",async(req,res)=>
 {
     try{
      const finddata=await User.find({})
      res.status(201).send(finddata);
     }
     catch(e){
         res.status(404).send(e);
     }
 })
*/

router.patch('/users/update', auth, async (req, res) => {
  const updatesbyuser = Object.keys(req.body)

  const allowedupdates = ['name', 'email', 'password', 'age']

  const validupdates = updatesbyuser.every((update) =>
    allowedupdates.includes(update),
  )

  if (!validupdates) {
    return res.status(400).send('INVALID UPDATE')
  }
  try {
    updatesbyuser.forEach((update) => {
      req.user[update] = req.body[update]
    })
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/users/delete/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    deleteaccount(req.user.email, req.user.name)
    res.send(req.user)
  } catch (error) {
    res.send(error)
  }
})

/*

const upload=multer({
    dest:"avatar",
    limits:{
     fileSize:1000000
    },
    fileFilter(req,file,cb)
    {
        // we can use endsWidth(".file extension")
        if(!file.originalname.match(/\.(doc|docx|jpg|png)$/)){ // REGULAR EXPRESSION
          return  cb(new Error("PLEASE UPLOAD A PDF FILE"))
        }
        cb(undefined,true);
    }
})
router.post("/users/me/avatar",upload.single("avatar"),(req,res)=>{

    res.send();
})*/

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('PLEASE UPLOAD A IMAGE FILE'))
    }
    cb(undefined, true)
  },
})
router.post(
  '/uploads/images',
  auth,
  upload.single('image'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ widht: 250, height: 300 })
      .png()
      .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('PROFILE UPDATED SUCCESFULLY')
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  },
)









router.delete('/profile/delete', auth, async (req, r90s) => {
  req.user.avatar = undefined
  await req.user.save()
  res.status(200).send('REMOVE SUCCESSFULLY')
})

router.get('/users/:id/profileimage', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router
