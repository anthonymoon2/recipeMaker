import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';  
import Footer from './components/Footer';  

function App() {
  return (
    <div className="App">
      {/* Header component */}
      <Header />
      
      {/* Main content section that will change based on the route */}
      <main className="main-content">
        <Outlet />
      </main>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;