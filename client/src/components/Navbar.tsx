import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div>
      {!loginCheck ? ( // if login check is false (not logged in)
        <header>
          <nav>
            <Link to="/"> dishUp </Link>

            <div className="nav-right">
              <Link to='/login'>Login</Link>
            </div>
          </nav>
        </header>
      ) : ( // if logged in - change navbar 
        <header>
          <nav>
            <Link to="/"> dishUp </Link>

            <div className="nav-right">
              <Link to="/"> My Recipes </Link>
              <button className='logout-btn' type='button' onClick={() => {auth.logout()}}>Logout</button>
            </div>
          </nav>
        </header>
      )}
    </div>
  );
};

export default Navbar;
