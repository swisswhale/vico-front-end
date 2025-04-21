import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Post = ({ post })  => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([...post.comments]);


    const handleAddComment = (event) => {
     event.preventDefault();
     if (!comment) return;
     setComments([...comments, comment]);
     setComment('');
    };

    const { user } = useContext(UserContext)
 return (
    
    <div className="apost">
    <img src={post.imageURL} alt="post" />
    <p className="caption">Caption: {post.caption}</p>
    <div className="comments">
    {comments.map((comment, index) => (
        <div className="comment" key={index}>{user.username}:{comment}</div>
    ))}
    </div>
    <form onSubmit={handleAddComment}>
        <input 
        type="text"
        value={comment}
        name="comment"
        placeholder="How do you feel ..."
        onChange={(event) => setComment([event.target.value])}
        />
        <button type="submit" className="postbutton"> Submit Comment</button>
    </form>
    </div>
   

 )
}

export default Post;