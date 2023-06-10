import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../services/MOBILITYAPI.JS';
import Loader from './Loader';
import CategoryBody from '../components/CategoryBody';
import { nanoid } from '@reduxjs/toolkit';
import { FaTrash } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';
const Categories = () => {
  // variabel
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch rtk
  const { data: categories, isLoading: isLoadCategory } =
    useGetAllCategoryQuery();

  useEffect(() => {}, []);

  return (
    <>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <h3>Category</h3>
          <Link
            to='/category'
            className='flex items-center bg-gray-300 rounded-lg px-4 py-2 shadow-lg'
          >
            <span className='material-symbols-outlined'> add </span>
            <span>New Category</span>
          </Link>
        </div>
        <table className='border-collapse text-left table-auto w-full mt-6'>
          <thead>
            <tr className='bg-gray-300'>
              <th className='px-4 py-2 text-center w-12'>No.</th>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Created At</th>
              <th className='px-4 py-2'>Updated At</th>
              <th className='px-4 py-2 text-end'>Update</th>
              <th className='px-4 py-2 text-end'>Delete</th>
            </tr>
          </thead>
          <tbody className='[&>*:nth-child(even)]:bg-gray-50'>
            {isLoadCategory
              ? [...Array(10)].map((el) => {
                  return (
                    <tr key={nanoid()} className='[&>*]:px-4 [&>*]:py-2'>
                      <td className='text-center w-12'>
                        <p className='w-[2rem] h-[.5rem] bg-slate-400/50 animate-pulse'></p>
                      </td>
                      <td>
                        <p className='w-[2rem] h-[.5rem] bg-slate-400/50 animate-pulse'></p>
                      </td>
                      <td>
                        <p className='w-[2rem] h-[.5rem] bg-slate-400/50 animate-pulse'></p>
                      </td>
                      <td>
                        <p className='w-[2rem] h-[.5rem] bg-slate-400/50 animate-pulse'></p>
                      </td>
                      <td className='text-end '>
                        <button>
                          <GrUpdate className='animate-pulse' />
                        </button>
                      </td>
                      <td className='text-end'>
                        <button>
                          <FaTrash className='text-red-500 animate-pulse' />
                        </button>
                      </td>
                    </tr>
                  );
                })
              : categories.map((el, i) => {
                  return <CategoryBody key={nanoid()} {...el} no={++i} />;
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categories;
