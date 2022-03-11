import React, { useState } from "react";
import {
  Link,
  useLocation,
  Outlet,
  useRoutes,
  useResolvedLocation,
  useParams,
} from "react-router-dom";

const cgrs = "default"
const [ cardNum, setCardNum ] = useState(1);

const cards = {
  "slj": {
    size: 20,
  },
  "fnc": {
    size: 20,
  },
  "est": {
    size: 20,
  },
  "cpr": {
    size: 30,
  },
  "awr": {
    size: 54,
  },
  "quo": {
    size: 26,
  },
  "bdm": {
    size: 10,
  },
  "bdf": {
    size: 10,
  },
  "ctr": {
    size: 54,
  },
  "chr": {
    size: 17,
  },
  "prj": {
    size: 30,
  }
};

function DrawCard({
  flip,
  cgrs,
  ...props
}) {
  const cardImg1 = require('./default1.jpg');
  const cardImg2 = require('./default2.jpg');
  console.log({ props });
  if (!flip) {
  return (
      <img src={ cardImg1 } alt={ `${props.title}` } />
  );
  } else {
  return (
      <img src={ cardImg2 } alt={ `${flip}` } />
  );
  }
}

function NavLink({
  to,
  exact,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) {
  let location = useLocation();
  let resolvedLocation = useResolvedLocation(to);

  let isActive;
  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  }
//else {
//  isActive = routeMatches.some(
//    (match) => match.pathname === resolvedLocation.pathname
//  );
//}

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allClassNames} to={to} {...rest} />;
}

const routes = [
  {
    path: "/new-dashboard",
    element: <Dashboard />,
    children: [
      { path: "/", element: <p>Overview</p> },
      {
        path: "/new-users",
        element: <NewUsers />,
        children: [{ path: "/:id", element: <UserDetail /> }],
      },
      { path: "/sales", element: <p>Sales</p> },
    ],
  },
  { path: "/bflow",
    element: <BFlow />,
    children: [
      { path: "ctr", element: <Category title="逆流" /> },
      { path: "awr", element: <DrawCard title="覺察" /> },
    ],
  },
  { path: "/oflow",
    element: <OFlow />,
    children: [
      { path: "slj", element: <Category title="副業" /> },
      { path: "fnc", element: <Category title="金融" /> },
      { path: "est", element: <Category title="地產" /> },
      { path: "cpr", element: <Category title="企業" /> },
      { path: "awr", element: <DrawCard title="覺察" flip={true} /> },
      { path: "quo", element: <Category title="行情" /> },
      { path: "bdm", element: <Category title="相親男" /> },
      { path: "bdf", element: <Category title="相親女" /> },
    ],
  },
  { path: "/fflow",
    element: <FFlow />,
    children: [
      { path: "chr", element: <Category title="慈善" /> },
      { path: "prj", element: <Category title="項目" /> },
    ],
  }
];

function NewUsers() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <p className="mb-4">New users:</p>

        {[...Array(20).keys()].map((index) => (
          <div key={index}>
            <NavLink
              to={`${index}`}
              activeClassName="text-gray-900"
              inactiveClassName="text-gray-300 hover:text-gray-500"
            >
              User {index}
            </NavLink>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function UserDetail() {
  let params = useParams();

  return <p className="text-lg font-semibold">User {params.id} detail</p>;
}

export default function App() {
  let element = useRoutes(routes);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                財富流卡牌
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/new-dashboard"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/bflow"
                >
                  逆流
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/oflow"
                >
                  平流
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/fflow"
                >
                  順流
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">{element}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="new-users"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              New users
            </NavLink>
            <NavLink
              to="sales"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Sales
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function BFlow() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <nav className="flex ml-8">
            <NavLink
              to="ctr"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              逆流
            </NavLink>
            <NavLink
              to="awr"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              覺察
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function OFlow() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <nav className="flex ml-8">
            <NavLink
              to="slj"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              副業
            </NavLink>
            <NavLink
              to="fnc"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              金融
            </NavLink>
            <NavLink
              to="est"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              地產
            </NavLink>
            <NavLink
              to="cpr"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              企業
            </NavLink>
            <NavLink
              to="awr"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              覺察
            </NavLink>
            <NavLink
              to="quo"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              行情
            </NavLink>
            <NavLink
              to="bdm"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              相親男
            </NavLink>
            <NavLink
              to="bdf"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              相親女
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function FFlow() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <nav className="flex ml-8">
            <NavLink
              to="chr"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              慈善
            </NavLink>
            <NavLink
              to="prj"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              項目
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Category({ title }) {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
