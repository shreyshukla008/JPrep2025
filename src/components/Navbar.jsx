import { NavLink } from "react-router-dom";

const Navbar = ({ userId, onLogout }) => {
  const tabs = [
    { label: "Home", path: `/user/${userId}/home`, 
    svg: (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-school w-[3rem]  group-hover:scale-120 duration-150 ease-in" 
      ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>) 
    },
    { label: "Courses", path: `/user/${userId}/courses`,
    svg:(<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-book-2 w-[3rem] group-hover:scale-120 duration-150 ease-in "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" /><path d="M19 16h-12a2 2 0 0 0 -2 2" /><path d="M9 8h6" /></svg>)
    },
    { label: "Starred", path: `/user/${userId}/starred`,
    svg: (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-pin w-[3rem] hover:font-bold group-hover:scale-120 duration-150 ease-in "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.113 3.21l.094 .083l5.5 5.5a1 1 0 0 1 -1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1 -.158 .277l-.07 .08l-1.5 1.5a1 1 0 0 1 -1.32 .082l-.095 -.083l-2.793 -2.792l-3.793 3.792a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.792 -3.793l-2.792 -2.793a1 1 0 0 1 -.083 -1.32l.083 -.094l1.5 -1.5a1 1 0 0 1 .258 -.187l.098 -.042l3.796 -1.425l3.171 -3.17a1 1 0 0 1 1.497 -1.26z" /></svg>)
    },
    { label: "Upload", path: `/user/${userId}/upload` ,
    svg:(<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-2 w-[3rem] group-hover:scale-120 duration-150 ease-in "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 18.004h-5.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.38 0 2.57 .811 3.128 1.986" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /></svg>
    )
    },
    // { label: "Admin", path: `/user/${userId}/admin` },
  ];

  

  return (
    <nav className="fixed h-[6rem] bottom-0 sm:top-0 left-0 right-0 flex justify-between items-end flex-wrap px-1 sm:px-6 py-2 sm:py-6 shadow-md bg-slate-50 dark:bg-dark-card">

      <div className="flex justify-between ">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold m-2 sm:mb-0 flex items-end"> <img className="w-[3rem] sm:w-[4rem] sm:-mt-8" src="/jprepLogo.png" alt="" /></h1>

      </div>

      <div className="flex-grow max-w-[1200px]   items-end mb-2">
        <div className="flex flex-wrap  justify-evenly  max-w-[1280px] items-center  font-medium sm:text-lg">
          {tabs.map((tab) => (
            <div className="flex flex-col group justify-center items-center" key={tab.path}> 
                <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  ` duration-150 ease-in hover:underline cursor-pointer flex flex-col items-center justify-center  ${
                    isActive
                    ? "font-bold text-blue-600 underline"
                    : "text-slate-900"
                  }`
                }
                >
                  <div>{tab.svg}</div>
                  <div>{tab.label}</div>
                
                
              </NavLink>
            </div>
            
          ))}
        
      </div>

      </div>
          <div className="flex w-[3rem] flex-wrap group items-center justify-center mb-2 font-medium sm:text-lg cursor-pointer">

          <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 22 22"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2 w-[1.5rem] text-red-500 group-hover:font-bold group-hover:scale-120  hover:text-red-600 duration-150 ease-in-out"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M15 12h-12l3 -3" /><path d="M6 15l-3 -3" /></svg>
          
          <button
            onClick={onLogout}
            className="font-medium text-red-500 group-hover:text-red-600 group-hover:underline group-hover:font-bold transition"
          >
            Logout
          </button>
          
        </div>

      
    </nav>
  );
};

export default Navbar;
