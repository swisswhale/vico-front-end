import { useState } from "react";

const Post = ({ post })  => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([...post.comments]);


    const handleAddComment = (event) => {
     event.preventDefault();
     if (!comment) return;
     setComments([...comments, comment]);
     setComment('')
    };

 return (
    
    <div className="posts">
    <img src={post.imageURL} alt="post" />
    <p>Caption: {post.caption}</p>
    <div className="comments">
    {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
    ))}
    </div>
    <form onSubmit={handleAddComment}>
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