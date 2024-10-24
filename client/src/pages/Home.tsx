import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="home">
            {
                !loginCheck ? (
                    <section className="welcome">
                        <h1>Welcome to DishUp!</h1>
                        <p>Discover recipes based on the ingredients you already have.</p>
                        <div className="cta-buttons">
                            <a href="/login" className="btn">Log In</a>
                            <a href="/signup" className="btn">Sign Up</a>
                        </div>
                    </section>
                ) : (
                    <UserList users={users} />
                )
            }
        </div>
    );
};

export default Home;
