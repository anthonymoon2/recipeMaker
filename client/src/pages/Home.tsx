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
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <div className='homepage'>
                            <div className='homepage-left'>
                                <h1>
                                    Create dishes using the ingredients in your fridge
                                </h1>
                            </div>
                            <div className="homepage-right">
                                <img className="home-food-image" src="./images/food.png"></img>
                            </div>
                        </div>

                        <div className="how-section">
                            <h2>How it works</h2>

                            <div className="how-section-steps-container">
                                <div className="how-section-steps-container-card">
                                    1
                                </div>
                                <div className="how-section-steps-container-card">
                                    2
                                </div>
                                <div className="how-section-steps-container-card">
                                    3
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <UserList users={users} />
                    
                )}
        </>
    );
};

export default Home;
