import { useState, useEffect, useLayoutEffect } from "react";
import ErrorPage from "./ErrorPage";
import UserIngredientsComponent from '../components/IngredientCard';
import auth from '../utils/auth';
import { UserData } from "../interfaces/UserData";

const Home = () => {
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [loggedInUser, setUpdateUser] = useState({} as UserData);

    useEffect(()=> {    
        if (loginCheck){
            setUpdateUser({id:auth.getProfile().id, username:auth.getProfile().username})
        }
    }, [loginCheck])

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

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
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    loggedInUser && <UserIngredientsComponent loggedInUser={loggedInUser} />
                )}
        </>
    );
};

export default Home;
