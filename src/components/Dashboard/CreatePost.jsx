import { useState } from "react";

import Post from "./Post";

const CreateAPost = () => {


    return (
     <form>
        <input 
        type="image"
        placeholder="Artwork"
        value={imageURL}
        />
        <input 
        type="text"
        placeholder="Why this piece ..."
        value={caption}
        />
        <button type="submit">Add Post</button>
     </form>
    );
}

export default CreateAPost;