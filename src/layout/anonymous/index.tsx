import { Outlet } from "react-router";

export function Anonymous() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-green-600 text-white p-4">
          <h1 className="text-xl">Welcome</h1>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <Outlet />
        </main>

        <footer className="bg-gray-700 text-white p-4 text-center">
          Join us today!
        </footer>
      </div>
    </>
  );
}
