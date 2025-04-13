import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as userService from '../../services/userService'

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index();
                setUsers(fetchedUsers);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) fetchUsers();
    }, [user]);


    return (
    <main>
        <h1>Welome to Vico, {user.username}</h1>
        <p>The Dashboard is the page to see a list of all users.</p>

        <ul>
           {users.map((user)=> (
            <li key={user._id}>{user.username}</li>
           ))}
        </ul>
    </main>
    );
};

export default Dashboard;