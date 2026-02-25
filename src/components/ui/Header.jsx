import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { useAuth } from "../../contexts/AuthContext";

const Header = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: "LayoutDashboard",
      description: "View your learning roadmap",
    },
    {
      label: "Quiz",
      path: "/module-quiz-interface",
      icon: "Brain",
      description: "Take adaptive quizzes",
    },
    {
      label: "Progress",
      path: "/progress",
      icon: "TrendingUp",
      description: "Track your learning progress",
    },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground">Nayi Disha</span>
        <span className="text-xs text-muted-foreground">
          AI-Powered Learning
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleNavigation("/ai-generated-roadmap")}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                iconName={item.icon}
                iconPosition="left"
                iconSize={18}
                className={`${isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : ""
                  }`}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Profile & Logout */}
          <div className="hidden lg:flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigation("/profile")}
            >
              <Icon name="User" size={16} className="text-white" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              iconSize={16}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            className="lg:hidden"
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`w-full justify-start px-4 py-3 ${isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : ""
                    }`}
                >
                  <div className="flex flex-col items-start">
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </Button>
              ))}

              {/* Mobile Profile & Logout */}
              <div className="pt-2 mt-4 border-t space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation("/profile")}
                  iconName="User"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  Log Out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
