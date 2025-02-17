import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FaBars,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router";
import { useUserStore } from "@/stores";
import { AuthService } from "@/services";
import { useMemo, useState } from "react";
import { FaPlane } from "react-icons/fa6";

export function Identified() {
  const { isAuthenticated, currentUser } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logout = () => {
    AuthService.logout();
  };

  const user = useMemo(() => currentUser?.profile, [currentUser]);

  if (!isAuthenticated) return <Navigate to="login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Mobile Toggle */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-600 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 md:hidden text-white text-2xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6">Flight App</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/flights" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FaPlane />
                <span>Flights</span>
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FaUser />
                <span>Reservations</span>
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow flex justify-between items-center p-4">
          <button className="md:hidden text-2xl" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>

          <h1 className="text-xl font-semibold"></h1>

          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
              <span>{user?.name}</span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-2">
                <p className="text-sm text-gray-700">{user?.preferred_username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <hr />
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`flex items-center w-full px-4 py-2 text-left ${
                      active ? "bg-gray-200" : ""
                    }`}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
