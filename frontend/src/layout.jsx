import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Common from './Pages/common'
import Landing from './Pages/Landing'
import LoginPopup from './Pages/login_page.jsx'
import Footer from './components/Footer.jsx'
import MarketplacePage from './Pages/services.jsx'
import Dashboard from './Profile/Dashboard'
import Business from './Pages/business.jsx'
import AiChatPopup from './Pages/AiChatPopup.jsx'

function Layout() {

  const location = useLocation()

  const showChatbot =
    location.pathname === "/common" ||
    location.pathname === "/services" ||
    location.pathname === "/dashboard"

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={
            <LoginPopup
              showLogin={true}
              setShowLogin={() => {}}
            />
          }
        />

        <Route
          path="/common"
          element={<Common />}
        />

        <Route
          path="/business"
          element={<Business />}
        />

        <Route
          path="/services"
          element={<MarketplacePage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

      {/* Floating AI Chat */}
      {showChatbot && (
        <AiChatPopup />
      )}

    </>
  )
}

export default Layout
