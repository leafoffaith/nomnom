import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "../src/pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import LogIn from "../src/pages/LogIn";
import UserAccount from "../src/pages/UserAccount"
import {AuthProvider} from "../src/components/AuthContext";

function App() {

    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage/>}/>
                <Route path="/results" element={<ResultsPage/>}/>
                <Route path="/log-in" element={<LogIn/>}/>
                <Route path="/user-account" element={<UserAccount/>}/>
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;