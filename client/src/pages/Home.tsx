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
                                    <h3>1. Sign Up or Log In</h3>
                                    <p>Create an account or log in.</p>
                                </div>
                                <div className="how-section-steps-container-card">
                                    <h3>2. Add Your Ingredients</h3>
                                    <p>Enter the ingredients you already have in your fridge.</p>
                                </div>
                                <div className="how-section-steps-container-card">

                                    <h3>3. Discover Recipes, Save, Cook, and Share</h3>
                                    <p>Browse personalized recipes that match your ingredients. Save recipes you love, follow easy steps to cook, and share your creations with friends.</p>

                                    

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
