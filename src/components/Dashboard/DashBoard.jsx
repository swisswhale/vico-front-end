import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as userService from '../../services/userService';
import Post from "./Post";
import CreateAPost from "./CreatePost";
import CollectionList from "../Collection/CollectionList";
import ArtworkList from "../Artwork/ArtworkList";




const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index();
                console.log(fetchedUsers);
                setUsers([...fetchedUsers]);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) fetchUsers();
    }, [user]);


    const addAPost = (newPost) => {
     setPosts([newPost, ...posts]);
    };


    return (
    <main>
        <h1>Welcome to Vico, {user?.username}</h1>
        <p>Share your favorite artwork from you collection!</p>

     <div className="dashboard">
        <CreateAPost addAPost={addAPost}/>
        <br>
        </br>
        <div className="posts-container">
        <div className="posts">
            {posts.map((post, index) => (
                <div key={index} className="post">
                <Post post={post} />
                </div>
            ))}
        </div>
        </div>
        
     </div>
       
    </main>
    );
};

export default Dashboard;