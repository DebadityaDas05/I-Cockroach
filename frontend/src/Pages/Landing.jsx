import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'
import Footer from '../components/Footer'

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Allow content to render before scrolling to target
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

function Landing() {
  return (
    <>
      <ScrollToTop />
      <Header/>
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default Landing