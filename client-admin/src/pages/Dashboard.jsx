import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useGetTotalQuery } from '../services/MOBILITYAPI.JS';
import { AiFillCar } from 'react-icons/ai';
const Dashboard = () => {
  const { isLoading, data, isSuccess, isError } = useGetTotalQuery();

  if (isLoading) {
    return (
      <div className='mt-4'>
        <div className='flex'>
          <div className='w-64 h-60 shadow-lg mr-6 border border-black rounded-md flex flex-col p-4'>
            <div className='h-20 w-20 self-center'>
              <AiFillCar className='text-[5rem] animate-pulse' />
            </div>
            <div>
              <h3 className='text-2xl font-[300] animate-pulse'>Total Car</h3>
              <p className='text-[50px]'></p>
            </div>
          </div>
          <div className='w-64 h-60 shadow-lg border border-black rounded-md flex flex-col p-4'>
            <div className='h-20 w-20 self-center'>
              <img
                src='https://icon-library.com/images/icon-categories/icon-categories-8.jpg'
                className='h-[100%] w-[100%] object-cover animate-pulse'
                alt=''
              />
            </div>
            <div>
              <h3 className='text-2xl font-[300] animate-pulse'>
                Total Category
              </h3>
              <p className='text-[50px]'></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='mt-4'>
        <div className='flex'>
          <div className='w-64 h-60 shadow-lg mr-6 border border-black rounded-md flex flex-col p-4'>
            <div className='h-20 w-20 self-center'>
              <AiFillCar className='text-[5rem]' />
            </div>
            <div>
              <h3 className='text-2xl font-[300]'>Total Car</h3>
              <p className='text-[50px]'>{data?.totalProduct}</p>
            </div>
          </div>
          <div className='w-64 h-60 shadow-lg border border-black rounded-md flex flex-col p-4'>
            <div className='h-20 w-20 self-center'>
              <img
                src='https://icon-library.com/images/icon-categories/icon-categories-8.jpg'
                className='h-[100%] w-[100%] object-cover'
                alt=''
              />
            </div>
            <div>
              <h3 className='text-2xl font-[300]'>Total Category</h3>
              <p className='text-[50px]'>{data?.totalCategory}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
