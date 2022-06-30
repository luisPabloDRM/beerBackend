const express = require('express');
const router = express.Router();

const Upload = require('../models/update')
// GET
router.get('/',  async (req, res) =>{
    const uploads =  await Upload.find()
    res.json(uploads);
});

router.get('/:id', async( req, res)=> {
  const uploads =  await Upload.findById(req.params.id);
  res.json(uploads)
})

// ADD
router.post('/', async (req, res)=> {
    const {name, image, price, rating} = req.body;
    const uploadPost = new Upload({name, image, price, rating})
    await uploadPost.save()
    res.json({status: 'Uploaded'});
});

// UPDATE
router.put('/:id', async(req, res) =>{
    const {name, image, price, rating} = req.body;
    const newUpload = {name, image, price, rating};
    await Upload.findByIdAndUpdate(req.params.id, newUpload)
    res.json({status: 'modified'});
})

// DELETE

router.delete('/:id', async(req, res) =>{
   
    await Upload.findByIdAndRemove(req.params.id)
    res.json({status: 'Deleted'});
})

module.exports = router;