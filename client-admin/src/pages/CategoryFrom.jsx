import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useAddCategoryMutation } from '../services/MOBILITYAPI.JS';
import Toast from '../components/Toast';
import { useLazyGetCategoryByIdQuery } from '../services/MOBILITYAPI.JS';
import { useUpdateCategoryMutation } from '../services/MOBILITYAPI.JS';

const CategoryForm = () => {
  // state
  const [category, setCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorCategory, setErrorCategory] = useState('');

  // variabel
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const categoryId = searchParams.get('category_id');
  const isEdit = Boolean(categoryId);

  // fetch rtk
  const [
    doAddCategory,
    {
      isLoading: isLoadAdd,
      isError: isErrAdd,
      isSuccess: isSucAdd,
      error: errAdd,
    },
  ] = useAddCategoryMutation();
  const [
    doGetCategory,
    { isLoading, isError, isSuccess: isSucGet, data: categoryData },
  ] = useLazyGetCategoryByIdQuery();
  const [
    doUpdateCategory,
    {
      isLoading: isLoadUpd,
      isError: isErrUpd,
      error: errUpd,
      isSuccess: isSucUpd,
      data: dataUpd,
    },
  ] = useUpdateCategoryMutation();

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!category) {
        throw {
          name: 'bad request',
          code: 400,
          message: 'Category is required',
        };
      }
      if (isEdit) {
        doUpdateCategory({
          categoryForm: { name: category },
          idCategory: categoryId,
        });
      } else {
        doAddCategory({ name: category });
      }
    } catch (err) {
      setErrorCategory(err.message);
    }
  };

  // side effect
  useEffect(() => {
    if (isSucAdd) {
      Toast({ message: 'successfully add category', timer: 3000 });
      navigate('/categories');
    }
  }, [isSucAdd]);
  useEffect(() => {
    if (isSucUpd) {
      Toast({ message: 'successfully update category', timer: 3000 });
      navigate('/categories');
    }
  }, [isSucUpd]);
  useEffect(() => {
    if (isEdit) {
      doGetCategory(categoryId);
    }
  }, [isEdit]);
  useEffect(() => {
    if (isSucGet) {
      setCategory(categoryData.name);
    }
  }, [isSucGet]);

  return (
    <>
      {isLoadAdd && <Loader />}
      {isLoadUpd && <Loader />}
      <div className='mt-6'>
        {/* {errMsg?.message && (
          <p className='text-red-500 text-[1.4rem] capitalize'>
            {errMsg?.message}
          </p>
        )} */}

        <form className='[&>*]:my-6' onSubmit={handleSubmit}>
          <div>
            <label>
              Category <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              <input
                type='text'
                className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                placeholder='Category Name'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errorCategory && (
                <p className='text-red-500 text-[.9rem] capitalize'>
                  {errorCategory}
                </p>
              )}
            </div>
          </div>
          <div className='flex [&>*]:px-4 [&>*]:py-4 w-[700px] justify-between'>
            <Link
              to={'/categories'}
              className='w-[45%] rounded-full border border-black text-center'
            >
              Cancel
            </Link>
            <button className='bg-gray-300 w-[45%] rounded-full' type='submit'>
              {isEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
