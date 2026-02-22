import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import RotatingText from "../../../components/ui/RotatingText";
const Logo = () => (
  <div className="flex items-center space-x-3">
    <h1 className="text-3xl font-bold flex items-center gap-2 leading-none">
      <span className="leading-none">Nayi</span>

      <RotatingText
        texts={["Disha", "Disha"]}
        rotationInterval={2000}
        auto
        loop
        splitBy="characters"

        /* animation */
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-120%", opacity: 0 }}
        staggerDuration={0.03}

        /* layout + height fix */
        mainClassName="
          inline-flex items-center
          px-3 py-1
          bg-[#7c35c7] text-white
          rounded-md
          shadow-[0_0_18px_rgba(124,53,199,0.85)]
          leading-none
        "

        splitLevelClassName="overflow-hidden leading-none"
        elementLevelClassName="leading-none"
      />
    </h1>
  </div>
);

const menuItems = [
  { name: "Features", href: "/features" },
  { name: "Solution", href: "/solution" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = false; // Set to false for landing page

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className=" top-0">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full">
        <div
          className={`mx-auto mt-4 px-6 transition-all duration-500 ease-in-out lg:px-12 ${isScrolled
            ? "bg-background/80 max-w-4xl rounded-2xl border border-border backdrop-blur-md lg:px-5 shadow-lg"
            : "max-w-6xl"
            }`}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo and mobile menu button */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={`m-auto size-6 transition-all duration-200 ${menuState ? "rotate-180 scale-0 opacity-0" : ""
                    }`}
                />
                <X
                  className={`absolute inset-0 m-auto size-6 transition-all duration-200 ${menuState
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-180 scale-0 opacity-0"
                    }`}
                />
              </button>
            </div>

            {/* Desktop menu */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile dropdown */}
            <div
              className={`bg-transparent mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none ${menuState ? "flex" : "hidden"
                }`}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.href.startsWith("#") ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground block duration-150"
                          onClick={() => setMenuState(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="text-muted-foreground hover:text-foreground block duration-150"
                          onClick={() => setMenuState(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors bg-[#7c35c7] hover:bg-[#4d217b] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/subject-selection"
                    className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-colors bg-primary hover:bg-primary/90 text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    Start Learning
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
