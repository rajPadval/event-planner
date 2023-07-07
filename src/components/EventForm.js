import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const apiToken = process.env.REACT_APP_API_TOKEN;
const apiAuthtoken = process.env.REACT_APP_API_AUTHTOKEN;

const EventForm = ({ setIsAuth, isAuth }) => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [eventData, setEventData] = useState({});
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchCities();
  }, [selectedCountry, selectedState]); // the states are in the dependency array so that the states can update fast

  // function to fetch countries
  const fetchCountries = async () => {
    const res = await fetch(
      "https://www.universal-tutorial.com/api/countries",
      {
        headers: {
          Authorization: `Bearer ${apiAuthtoken}`,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    setCountries(data);
  };

  // function to fetch states
  const fetchStates = async () => {
    const res = await fetch(
      `https://www.universal-tutorial.com/api/states/${selectedCountry}`,
      {
        headers: {
          Authorization: `Bearer ${apiAuthtoken}`,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    setStates(data);
  };

  // function to fetch cities
  const fetchCities = async () => {
    const res = await fetch(
      `https://www.universal-tutorial.com/api/cities/${selectedState}`,
      {
        headers: {
          Authorization: `Bearer ${apiAuthtoken}`,
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    setCities(data);
  };

  // function to sign with google
  const SignWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
    toast.success(`Welcome ${user.user.displayName}`);
    setUserEmail(user.user.email);
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
  };

  // function to sign out with google
  const SignOut = async () => {
    const user = await signOut(auth);
    toast.success(`See you soon👋`);
    localStorage.clear();
    setIsAuth(false);
  };

  // function to get the values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevEventData) => ({ ...prevEventData, [name]: value }));
  };

  // function to create the event
  const createEvent = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      toast.error("Please Sign In");
    } else {
      console.log(eventData);
      try {
        const docRef = await addDoc(collection(db, userEmail), { eventData });
        toast.success("Event Created");
        setEventData({});
      } catch (error) {
        console.log(error);
        toast.error("Some Error Occured");
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full h-screen flex justify-center items-center">
        <form className="w-[80vw] md:w-[80vw] lg:w-[60vw] " action="/">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="eventName"
              >
                Event Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="eventName"
                type="text"
                placeholder="Podcast with ****"
                name="eventName"
                onChange={handleChange}
              />
              <p className="text-gray-600 text-xs italic">
                Make it in a crisp way
              </p>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6"></div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="firstName"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                name="firstName"
                onChange={handleChange}
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="country"
              >
                Country
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="country"
                  value={selectedCountry}
                  name="country"
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    handleChange(e);
                  }}
                >
                  {countries.map((country, i) => (
                    <option key={i}>{country.country_name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={selectedState}
                  name="state"
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    handleChange(e);
                  }}
                >
                  {states.map((state, index) => (
                    <option key={index}>{state.state_name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                City
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="city"
                  onChange={handleChange}
                >
                  {cities.map((city, index) => (
                    <option key={index}>{city.city_name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-5">
            <div className="w-full  md:w-1/3  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="date"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="outline-none text-gray-700 bg-gray-200 px-3 py-2 rounded-md focus:bg-white focus:border-gray-500 border"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="fTime"
              >
                From Time
              </label>
              <input
                type="time"
                name="fTime"
                onChange={handleChange}
                className="outline-none text-gray-700 bg-gray-200 px-3 py-2 rounded-md focus:bg-white focus:border-gray-500 border"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="tTime"
              >
                To Time
              </label>
              <input
                type="time"
                name="tTime"
                onChange={handleChange}
                className="outline-none text-gray-700 bg-gray-200 px-3 py-2 rounded-md focus:bg-white focus:border-gray-500 border"
              />
            </div>
          </div>
          <button
            onClick={createEvent}
            className={`bg-red-600 px-3 py-2 rounded-md my-5 text-white font-bold  hover:bg-red-400 ${
              isAuth ? "animate-pulse" : "animate-none"
            }`}
          >
            Create Event
          </button>
        </form>
        <button
          onClick={SignWithGoogle}
          className={`${
            !isAuth ? "absolute" : "hidden"
          } bottom-10 right-10 border-2 px-3 py-2 font-bold rounded-md shadow-md border-green-500 hover:border-transparent hover:bg-green-500 hover:text-white animate-bounce hover:animate-none transition-all`}
        >
          Sign In
        </button>
        <button
          onClick={SignOut}
          className={`${
            isAuth ? "absolute" : "hidden"
          } bottom-10 right-10 border-2 px-3 py-2 font-bold rounded-md shadow-md border-red-500 hover:border-transparent hover:bg-red-500 hover:text-white`}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default EventForm;
