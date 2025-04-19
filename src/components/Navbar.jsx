import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, signOut } from '../firebase/config';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSectionNavigation = (sectionId) => {
        // If we're not on the home page, navigate to home first
        if (window.location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete before scrolling
            setTimeout(() => {
                scrollToTop();
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        // Add extra offset to account for fixed navbar
                        const offset = 80; // Adjust this value based on your navbar height
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 500);
            }, 100);
        } else {
            // If we're already on the home page, just scroll to the section
            scrollToTop();
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    // Add extra offset to account for fixed navbar
                    const offset = 80; // Adjust this value based on your navbar height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
        // Close mobile menu if open
        setIsOpen(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            logout();
            navigate('/');
            setIsOpen(false);
            scrollToTop();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleLoginClick = () => {
        if (window.location.pathname === '/login') {
            scrollToTop();
        } else {
            navigate('/login');
            setTimeout(scrollToTop, 100);
        }
        setIsOpen(false);
    };

    const handleSignupClick = () => {
        if (window.location.pathname === '/signup') {
            scrollToTop();
        } else {
            navigate('/signup');
            setTimeout(scrollToTop, 100);
        }
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#001f3d] border-b border-gray-300 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo and Brand */}
                <Link to="/" onClick={scrollToTop} className="flex items-center space-x-3">
                    <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-white">TrustChain</h3>
                </Link>

                {/* Hamburger Icon - mobile only */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-white transition-colors duration-400 relative group text-2xl"
                                onClick={scrollToTop}
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-white transition-colors duration-200 relative group text-2xl"
                                onClick={() => handleSectionNavigation('services-section')}
                            >
                                Services
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-white transition-colors duration-200 relative group text-2xl"
                                onClick={() => handleSectionNavigation('about-section')}
                            >
                                About
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-white hover:text-white transition-colors duration-200 relative group text-2xl"
                                onClick={scrollToTop}
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        </li>
                    </ul>

                    <Link to="/forum" onClick={scrollToTop} className="hover:scale-105 transition">
                        <img src="/forum image.jpeg" alt="Forum" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                    </Link>

                    {currentUser ? (
                        <button
                            onClick={handleLogout}
                            className="text-md font-semibold text-white bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="text-md font-semibold text-white bg-blue-500 px-5 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
                            onClick={handleLoginClick}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden px-6 pb-4 space-y-4 bg-[#001f3d]">
                    <Link
                        to="/"
                        className="block text-white text-lg hover:underline"
                        onClick={() => {
                            scrollToTop();
                            setIsOpen(false);
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        to="/"
                        className="block text-white text-lg hover:underline w-full text-left"
                        onClick={() => {
                            handleSectionNavigation('services-section');
                            setIsOpen(false);
                        }}
                    >
                        Services
                    </Link>
                    <Link
                        to="/"
                        className="block text-white text-lg hover:underline w-full text-left"
                        onClick={() => {
                            handleSectionNavigation('about-section');
                            setIsOpen(false);
                        }}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="block text-white text-lg hover:underline"
                        onClick={() => {
                            scrollToTop();
                            setIsOpen(false);
                        }}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/forum"
                        className="block text-white text-lg hover:underline"
                        onClick={() => {
                            scrollToTop();
                            setIsOpen(false);
                        }}
                    >
                        Forum
                    </Link>
                    {currentUser ? (
                        <button
                            onClick={handleLogout}
                            className="block w-full text-center text-white bg-red-500 py-2 rounded-xl hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="block text-center text-white bg-blue-500 py-2 rounded-xl hover:bg-blue-600"
                            onClick={() => {
                                scrollToTop();
                                setIsOpen(false);
                            }}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;


