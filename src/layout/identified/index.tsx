import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  FaChartLine,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, Navigate, Outlet } from "react-router";
import { useUserStore } from "@/stores";
import { AuthService } from "@/services";
import { useMemo } from "react";

export function Identified() {
  const { isAuthenticated, currentUser } = useUserStore();

  const logout = () => {
    AuthService.logout();
  };

  const user = useMemo(() => currentUser?.profile, [currentUser]);

  if (!isAuthenticated) return <Navigate to="login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-6">Flight Service</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FaHome />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FaChartLine />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded"
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
              <span>{user?.given_name}</span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-2">
                <p className="text-sm text-gray-700">
                  {user?.preferred_username}
                </p>
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

        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
