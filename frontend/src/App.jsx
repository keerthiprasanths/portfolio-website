import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<PageTransition><Home /></PageTransition>}
          />
          <Route
            path="/portfolio"
            element={<PageTransition><Portfolio /></PageTransition>}
          />
          <Route
            path="/about"
            element={<PageTransition><About /></PageTransition>}
          />
          <Route
            path="/contact"
            element={<PageTransition><Contact /></PageTransition>}
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
