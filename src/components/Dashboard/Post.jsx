import { useState } from "react";

const Post = ({ post })  => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);


    const handleComment = (event) => {
     
    }
    
 return (
    <div className="posts">
    <img src={post.imageURL} alt="post" style={
        {width: '300px'}}/>
    <p>Post Caption: {post.caption}</p>
    <div className="comments">
    {comments.map((com, index) => (
        <p key={index}>{com}</p>
    ))};
    </div>
    <form>
        <input 
        type="text"
        value={comment}
        name="comment"
        placeholder="How do you feel ..."
        onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit"> Submit Comment</button>
    </form>
    </div>

 )
}

export default Post;