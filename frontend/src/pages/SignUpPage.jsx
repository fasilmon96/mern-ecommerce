import { useState } from "react";
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from "../stores/useUserStroe";

const SignUpPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const {signup , loading}  =useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(data);
  }

  return (
    <div className="flex flex-col justify-center sm:py-2 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-emerald-400">Create your account</h2>

      </motion.div>
      <motion.div
       className="mx-auto w-full max-w-xs sm:max-w-md"
       initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10 mt-6 sm:mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className=" h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="name"
                  required value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm
                 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-md"
                  placeholder="fasil"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className=" h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  required value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm
                 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-md"
                  placeholder="fasil@gmail.com"
                />
              </div>
            </div>
              <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className=" h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="password"
                  required value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm
                 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-md"
                  placeholder="**********"
                />
              </div>
            </div>
               <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className=" h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  required value={data.confirmPassword}
                  onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border-gray-600 rounded-md shadow-sm
                 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-md"
                  placeholder="**********"
                />
              </div>
            </div>
            <button 
             type="submit"
             className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium
             text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500
             transition duration-150 ease-in-out disabled:opacity-50"
             disabled = {loading}
            >
              {loading ? (
                <>
                 <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden = "true"/>
                 Loadng....
                </>
              ) : (
                <>
                 <UserPlus className="mr-2 h-5 w-5" aria-hidden = "true"/>
                 Sign up
                </>
              )
            }
            </button>
          </form>
           <p className="mt-8 text-center text-sm text-gray-400"
            > Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-emerald-400 hover:text-emerald-300">
              Login here <ArrowRight className="inline h-4 w-4"/>
            </Link>
           </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUpPage
