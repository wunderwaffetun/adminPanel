import React from "react";
import Main from "./components/Main";
import AdminPanel from "./components/panel/AdminPanel";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Data from "./components/UsersData/Data";
import Auth from "./components/forms/Auth";
import Add from "./components/forms/Add";
import Edit from "./components/forms/Edit";


const router = createBrowserRouter([
  { 
    someProps: 'Hello World',
    element: (
      <div className="app-presentation">
        <AdminPanel/> 
        <Outlet/>
      </div>
    ), 
    children: [
      {
        path: '/',
        element: <Main/>,
        children: [
            { 
                path: '/', 
                element: <Data/>,
            }, 
            {
                path: '/auth',
                element: <Auth/>
            },
            { 
                path: '/reg', 
                element: <Add/>,
            }, 
            {
                path: '/edit',
                element: <Edit/>
            }
        ]
      }

    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
