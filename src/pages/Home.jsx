const Home = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.name.toUpperCase();

    return (
      <div className=" flex flex-col  min-h-[60vh] justify-center pt-2">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-semibold mb-4"> Hey! <strong className="text-4xl text-blue-700/90 ">{userName}</strong> </h2>
            <h2 className="text-3xl font-semibold mb-4"> Welcome to <strong className="text-4xl text-blue-700/90 italic">J-Prep</strong> </h2>
        </div>
        <p className="text-xl text-gray-400 mt-8">
          Search and explore previous year questions, starred content, and manage course documents.
        </p>
      </div>
    );
  };
  
  export default Home;
  