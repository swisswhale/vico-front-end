import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import * as userService from '../../services/userService'

const Dashboard = () => {


    return (
    <main>
        <h1>Welome to Vico, {user.username}</h1>
        <p>The Dashboard is the page to see a list of all users.</p>

        <ul>
            {users.map((user)=> {
        <li key={}></li>
            })}
        </ul>
    </main>
    )
};