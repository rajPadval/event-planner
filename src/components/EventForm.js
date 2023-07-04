import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const apiToken = process.env.REACT_APP_API_TOKEN;
const apiAuthtoken = process.env.REACT_APP_API_AUTHTOKEN;

const EventForm = () => {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

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
                for="grid-event-name"
              >
                Event Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-event-name"
                type="text"
                placeholder="Podcast with ****"
              />
              <p className="text-gray-600 text-xs italic">
                Make it in a crisp way
              </p>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6"></div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
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
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Country
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
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
                  onChange={(e) => {
                    setSelectedState(e.target.value);
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
          <button
            onClick={(e) => {
              e.preventDefault();
              toast.success("Event Created");
            }}
            className="bg-red-600 px-3 py-2 rounded-md my-3 text-white font-bold  hover:bg-red-400"
          >
            Create Event
          </button>
        </form>
        <button
          onClick={SignWithGoogle}
          className="absolute bottom-10 right-10 border-2 px-3 py-2 font-bold rounded-md shadow-md border-green-500 "
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default EventForm;
