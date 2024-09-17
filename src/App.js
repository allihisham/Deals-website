import React, { useEffect, Suspense, lazy } from 'react';
import './App.css'; // Assuming you have global styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome icons
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Lazy load the components
const Home = lazy(() => import('./Home'));
const SimDeals = lazy(() => import('./simdeals')); 
const MobileDeals = lazy(() => import('./mobiledeals'));
const AppleDeals = lazy(() => import('./AppleDeals')); // Add this line

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 404 Not Found Component
function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simdeals" element={<SimDeals />} />
            <Route path="/mobiledeals" element={<MobileDeals />} />
            <Route path="/mobiledeals/iphone" element={<AppleDeals />} /> {/* Add this line */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;