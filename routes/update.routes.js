const express = require('express');
const router = express.Router();

const Upload = require('../models/update')
// GET
router.get('/posts',  async (req, res, next) =>{
    try{
        const uploads =  await Upload.find()
        return res.status(200).json(uploads);
    }catch (error){
        return next(error);
    }
    
    
});

router.get('/:id', async( req, res)=> {
  const uploads =  await Upload.findById(req.params.id);
  res.json(uploads)
})

// ADD
router.post('/', async (req, res)=> {
    const {name, image, price, rating, description} = req.body;
    const uploadPost = new Upload({name, image, price, rating, description})
    await uploadPost.save()
    res.json({status: 'Uploaded'});
});

// UPDATE
router.put('/:id', async(req, res) =>{
    const {name, image, price, rating, description} = req.body;
    const newUpload = {name, image, price, rating, description};
    await Upload.findByIdAndUpdate(req.params.id, newUpload)
    res.json({status: 'modified'});
})

// DELETE

router.delete('/:id', async(req, res) =>{
   
    await Upload.findByIdAndRemove(req.params.id)
    res.json({status: 'Deleted'});
})

module.exports = router;