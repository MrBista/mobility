import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImPencil2 } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import Loader from './Loader';
import { useGetAllProductQuery } from '../services/MOBILITYAPI.JS';
import ProductBody from '../components/ProductBody';
import { nanoid } from '@reduxjs/toolkit';
const Products = () => {
  // state

  //variabel
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetch rtk
  const { data, isLoading, isSuccess, isError } = useGetAllProductQuery();

  // function

  // side effect
  useEffect(() => {
    if (isSuccess) {
      // console.log(data, '<==== ini dia data');
    }
  }, [isSuccess]);

  return (
    <>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <h3>Cars</h3>
          <Link
            to={'/product'}
            className='flex items-center bg-gray-300 rounded-lg px-4 py-2 shadow-lg'
          >
            <span className='material-symbols-outlined'> add </span>
            <span>New Cars</span>
          </Link>
        </div>
        <table className='border-collapse text-left table-auto w-full mt-6'>
          <thead>
            <tr className='bg-gray-300'>
              <th className='px-4 py-2 text-center w-12'>No.</th>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Category</th>
              <th className='px-4 py-2'>Main Image</th>

              <th className='px-4 py-2'>Price</th>

              <th className='px-4 py-2'>Author</th>
              <th className='px-4 py-2 text-center'>Update</th>
              <th className='px-4 py-2 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody className='[&>*:nth-child(even)]:bg-gray-50'>
            {isLoading
              ? [...Array(6)].map((el) => {
                  return (
                    <tr key={nanoid()}>
                      <td className='text-center w-12'>
                        <p className='w-[3rem] h-[.5rem] bg-slate-400/20 rounded animate-pulse'></p>
                      </td>
                      <td>
                        <p className='w-[8rem] h-[.5rem] bg-slate-400/20 rounded'></p>
                      </td>
                      <td className='text-left'>
                        <p className='w-[8rem] h-[.5rem] bg-slate-400/20 rounded animate-pulse'></p>
                      </td>
                      <td className='text-left'>
                        <div className='h-24 w-36 aspect-video'>
                          <div className='h-[100%] w-[100%] animate-pulse bg-slate-400/20' />
                        </div>
                      </td>

                      <td>
                        <p className='w-[5rem] h-[.5rem] bg-slate-400/20 rounded animate-pulse'></p>
                      </td>
                      <td>
                        <p className='w-[5rem] h-[.5rem] bg-slate-400/20 rounded animate-pulse'></p>
                      </td>

                      <td className='text-center'>
                        <button>
                          <GrUpdate className='animate-pulse' />
                        </button>
                      </td>
                      <td className='text-center'>
                        <button>
                          <MdDelete className='text-[1.5rem] block text-red-400 animate-pulse' />
                        </button>
                      </td>
                    </tr>
                  );
                })
              : data?.map((el, i) => {
                  return <ProductBody key={el.id} {...el} no={++i} />;
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
