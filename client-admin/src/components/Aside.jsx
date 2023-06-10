import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { MdSpaceDashboard, MdCategory } from 'react-icons/md';
import { GiRunningShoe } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { mobilityApi } from '../services/MOBILITYAPI.JS';

const Aside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
    dispatch(mobilityApi.util.resetApiState());
  };
  return (
    <>
      <aside className='w-64 fixed h-screen top-[51px] left-0 border-r-2 border-slate-200'>
        <ul className='px-4 py-2 relative flex flex-col'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive
                ? 'px-2 py-3 border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm bg-gray-300'
                : 'px-2 py-3 active:border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm hover:bg-gray-300'
            }
          >
            <p href='' className='text-center flex items-center'>
              <MdSpaceDashboard className='text-[1.6rem]' />
              <span className='ml-2'>Dashboard</span>
            </p>
          </NavLink>
          <NavLink
            to={'/products'}
            className={({ isActive }) =>
              isActive
                ? 'px-2 py-3 border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm bg-gray-300'
                : 'px-2 py-3 active:border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm hover:bg-gray-300'
            }
          >
            <p to='/products' href='' className='text-center flex items-center'>
              <AiFillCar className='text-[1.6rem]' />
              <span className='ml-2'>Products</span>
            </p>
          </NavLink>
          <NavLink
            to={'/categories'}
            className={({ isActive }) =>
              isActive
                ? 'px-2 py-3 border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm bg-gray-300'
                : 'px-2 py-3 active:border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm hover:bg-gray-300'
            }
          >
            <p href='' className='text-center flex items-center'>
              <MdCategory className='text-[1.6rem]' />
              <span className='ml-2'>Categories</span>
            </p>
          </NavLink>
          <NavLink
            to={'/register'}
            className={({ isActive }) =>
              isActive
                ? 'px-2 py-3 border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm bg-gray-300'
                : 'px-2 py-3 active:border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm hover:bg-gray-300'
            }
          >
            <p href='' className='text-center flex items-center'>
              <BsFillPersonPlusFill className='text-[1.6rem]' />
              <span className='ml-2'>Register</span>
            </p>
          </NavLink>
        </ul>

        <ul className='absolute w-full bottom-20 px-4 py-2'>
          <li
            onClick={handleLogout}
            className='px-2 py-3 active:border-l-4 border-indigo-300 cursor-pointer transition-all duration-100 ease-in rounded-sm hover:bg-gray-300'
          >
            <p href='' className='text-center flex items-center'>
              <span className='material-symbols-outlined'> logout </span>
              <span className='ml-2'> Log Out</span>
            </p>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
