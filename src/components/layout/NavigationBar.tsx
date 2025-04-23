
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationBarProps {
  isLoggedIn?: boolean;
  userType?: "admin" | "user";
}

const NavigationBar = ({ isLoggedIn = false, userType }: NavigationBarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-library-purple" />
          <span className="text-xl font-semibold text-gray-800">LibraryHub</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-library-purple transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-library-purple transition-colors">
            About
          </Link>
          <Link to="/books" className="text-gray-700 hover:text-library-purple transition-colors">
            Books
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to={userType === "admin" ? "/admin/dashboard" : "/dashboard"}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => console.log("User logged out")}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
