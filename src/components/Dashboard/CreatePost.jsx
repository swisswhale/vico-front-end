import { useState } from "react";

import Post from "./Post";


const CreateAPost = ( { addAPost }) => {

    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!image || !caption) return;
        addAPost({caption, image, comments: []});
        setImage('');
        setCaption('');
    };


    return (
     <form onSubmit={handleSubmit}>
        <input 
        type="imageURL"
        placeholder="Artwork"
        value={image}
        onChange={(event) => setImage(event.target.value)}
        />
        <br>
        </br>
        <input 
        type="text"
        placeholder="Why this piece ..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        />
        <button className="postbutton" type="submit">Add Post</button>
     </form>
    );
}

export default CreateAPost;