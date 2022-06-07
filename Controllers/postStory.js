const Post = require("../models/post");
const User = require("../models/User");
const router = require("express").Router();
const auth_jwt = require("../middleware/auth_jwt");
const jwt = require("jsonwebtoken")

//=========================create post=========================
router.post("/post",auth_jwt,async(req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.email;
    console.log(email);
    const { title, body } = req.body;
    const user = await User.findOne({where: {Email: email}});
    console.log(user);
    if (!user) {
        return res.status(404).send("User not found");
    }
    const userPost = await user.createPost({
        title,
        body,
    });
    res.status(201).send(userPost);
});


//=========================update title=========================
router.put('/post/update/title',auth_jwt,async(req,res)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.email;
    const {id,title} = req.body;
    const user = await User.findOne({where: {Email: email}});
    const post = await Post.findOne({where: {id: id}});
    if(post.userId !== user.id){
        return res.status(401).send({
            message: "You are not authorized to update this post!"
        });
    }
    if (!post) {
        return res.status(404).send("Post not found");
    }
    await post.update({
        title
    });
    res.status(201).send({
        message: "Title updated successfully!",
        post: post
    });
})


//=========================update body=========================
router.put('/post/update/body',auth_jwt,async(req,res)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.email;
    const {id,body} = req.body;
    const user = await User.findOne({where: {Email: email}});
    const post = await Post.findOne({where: {id: id}});
    if(post.userId !== user.id){
        return res.status(401).send({
            message: "You are not authorized to update this post!"
        });
    }
    if (!post) {
        return res.status(404).send("Post not found");
    }
    await post.update({
        body
    });
    res.status(201).send({
        message: "Body updated successfully!",
        post: post
    });
})

//=========================delete post=========================
router.delete('/post/delete/:id',auth_jwt,async(req,res)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.email;
    console.log(email);
    const {id} = req.params;
    const user = await User.findOne({where: {Email: email}});
    const post = await Post.findOne({where: {id: id}});
    if(post.userId !== user.id){
        return res.status(401).send({
            message: "You are not authorized to DELETE this post!"
        });
    }
    if (!post) {
        return res.status(404).send("Post not found");
    }
    await post.destroy();
    res.status(201).send({
        message: "Post deleted successfully!",
        post: post
    });
})

//=========================get all posts=========================
router.get('/post/all',auth_jwt,async(req,res)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.email;
    const user = await User.findOne({where: {Email: email}});
    if (!user) {
        return res.status(404).send("User not found");
    }
    const posts = await Post.findAll({
        where: {
            userId: user.id
        }
    });
    res.status(201).send(posts);
})

//=========================get post by user=========================
router.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findAll({where: {userId: id}});
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.status(201).send(post);
}
)

module.exports = router;