import React from 'react';

import type { UserData } from "../interfaces/UserData";
import auth from '../utils/auth';

// Define the props for the component
export interface UserListProps {
    users: UserData[] | null; // users can be an array of UserData objects or null
}



const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <>
            <h2 className="pb-5">
               Hey {auth.getProfile().username}, add ingredients to your fridge!
            </h2>

            <div className='ingredient-input-form-container'>
                <input className="ingredient-input-form-name" placeholder='apple'></input>
                <button className="add-ingredient-button">
                    add ingredient!
                </button>
            </div>

            {users && users.map((user) => (
                <div className="ingredient-card">
                    <div className="ingredient-card-ingredient">
                        {user.username}
                    </div>
                    <div className="ingredient-card-delete-button-container">
                        <button className="ingredient-card-delete-button">x</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;
