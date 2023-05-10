import img from "./../../assets/svg/not-found.svg";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center dark:bg-black bg-mainColor">
      <div className="flex flex-col gap-1 items-center font-robotoCondensed">
        <img src={img} alt="not found" className="lg:max-h-[370px] xs:max-h-[270px] max-h-[180px] w-full"/>
        <h3 className="sm:text-2xl xs:text-xl text-lg mt-2 dark:text-gray-50 text-gray-900 font-medium">Ohh! Page Not found </h3>
        <p className="sm:text-[16.75px] text-[14px] dark:text-gray-300 text-gray-800 ">We can't seem to find the page you are looking for</p>
      </div>
    </div>
  );
};

export default NotFound;
