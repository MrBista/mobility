import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useGetAllCategoryQuery } from '../services/MOBILITYAPI.JS';
import { useAddProductMutation } from '../services/MOBILITYAPI.JS';
import { FaTrash } from 'react-icons/fa';
import Toast from '../components/Toast';
import { useUpdateProductMutation } from '../services/MOBILITYAPI.JS';
import { nanoid } from '@reduxjs/toolkit';
import { useLazyGetProductByIdQuery } from '../services/MOBILITYAPI.JS';

const AddProduct = () => {
  // state
  const [inputImages, setInputImages] = useState(['']);
  const [productForm, setProductForm] = useState({
    name: '',
    mainImg: '',
    price: '',
    categoryId: '',
    description: '',
  });
  const [errors, setErrors] = useState([]);
  const [searchParams] = useSearchParams();

  // variabel
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(searchParams.get('product_id'));
  const editId = searchParams.get('product_id');
  const isEdit = Boolean(editId);

  // fetcht rtk
  const {
    data: categories,
    isLoading: isLoadCategory,
    isSuccess: isSucCategory,
    isFetching,
  } = useGetAllCategoryQuery();
  const [
    doGetProduct,
    {
      isLoading: isLoadGet,
      isSuccess: isSucGet,
      isError: isErrGet,
      error: errGet,
      data: productData,
    },
  ] = useLazyGetProductByIdQuery();

  const [
    doAddProduct,
    {
      isLoading: isLoadPrd,
      isSuccess: isSucPrd,
      isError: isErrPrd,
      error: errProduct,
    },
  ] = useAddProductMutation();
  const [
    doUpdateProduct,
    {
      isLoading: isLoadEdit,
      isError: isErrEdit,
      isSuccess: isSucEdit,
      error: errEdit,
    },
  ] = useUpdateProductMutation();

  // function
  const addImagesField = () => {
    setInputImages([...inputImages, ``]);
  };
  const removeImagesField = (i) => {
    let newInputImages = [...inputImages];
    newInputImages.splice(i, 1);
    setInputImages(newInputImages);
  };
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const handelInputImages = (value, index) => {
    const newImages = [...inputImages];
    newImages[index] = value;
    setInputImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { categoryId, description, mainImg, name, price } = productForm;

      const message = [];
      if (!name) {
        message.push({ type: 'name', message: 'Name is required' });
      }
      if (!description) {
        message.push({
          type: 'description',
          message: 'Description is required',
        });
      }
      if (!price) {
        message.push({ type: 'price', message: 'Price is required' });
      }
      if (price && +price < 3000) {
        message.push({ type: 'price', message: 'Minimum price is 3000' });
      }
      if (!mainImg) {
        message.push({ type: 'mainImg', message: 'Main image is required' });
      }
      if (!categoryId) {
        message.push({ type: 'category', message: 'Category is required' });
      }
      if (message.length) {
        throw { name: 'bad request', message: message, code: 400 };
      }
      if (isEdit) {
        const newProductForm = { ...productForm, images: inputImages };
        doUpdateProduct({ idProduct: editId, productForm: newProductForm });
      } else {
        doAddProduct({ ...productForm, images: inputImages });
      }
    } catch (err) {
      setErrors(err.message);
    }
  };

  // side effect
  useEffect(() => {
    if (isErrPrd) {
      if (errProduct?.data?.message?.length) {
        setErrors(errProduct?.data?.messages);
      }
    }
  }, [isErrPrd]);
  useEffect(() => {
    if (isSucPrd) {
      Toast({ message: 'success add product', type: 'success', timer: 3000 });
      navigate('/products');
    }
  }, [isSucPrd]);

  useEffect(() => {
    if (!isEdit) {
      setProductForm({
        name: '',
        mainImg: '',
        price: '',
        categoryId: '',
        description: '',
      });
      setInputImages(['']);
    }
  }, [isEdit]);
  useEffect(() => {
    if (isEdit) {
      doGetProduct(editId);
    }
  }, [isEdit]);
  useEffect(() => {
    if (isSucEdit) {
      Toast({
        message: 'success update product',
        type: 'success',
        timer: 3000,
      });
      navigate('/products');
    }
  }, [isSucEdit]);
  useEffect(() => {
    if (isSucGet) {
      setProductForm({
        name: productData?.name,
        categoryId: productData?.Category?.id,
        description: productData?.description,
        mainImg: productData?.mainImg,
        price: productData?.price,
      });
      const newInputImages = productData?.Images?.map((el) => el.imgUrl);
      setInputImages(newInputImages);
    }
  }, [isSucGet]);

  return (
    <>
      {isLoadPrd && <Loader />}
      {isLoadEdit && <Loader />}
      <div className=' '>
        <form
          className={errors?.length > 3 ? '[&>*]:my-1' : `[&>*]:my-2`}
          onSubmit={handleSubmit}
        >
          <div>
            <label>
              Name <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              <input
                type='text'
                className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                placeholder='Car Name'
                name='name'
                value={productForm.name}
                onChange={handleChange}
              />
              {errors &&
                errors.map((el) => {
                  if (el.type === 'name') {
                    return (
                      <p key={nanoid()} className='text-red-500 text-[.95rem] '>
                        {el.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div>
            <label>
              Category <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              {isLoadCategory ? (
                <select
                  type='text'
                  className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg  animate-pulse bg-slate-300/50'
                  name='categoryId'
                  defaultValue={''}
                  disabled
                >
                  <option disabled value={''}>
                    --Menunggu--
                  </option>
                </select>
              ) : (
                <select
                  type='text'
                  className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200 bg-white'
                  name='categoryId'
                  defaultValue={productForm?.categoryId}
                  onChange={handleChange}
                >
                  <option disabled value={''}>
                    --Category--
                  </option>
                  {categories.map(({ name, id }) => {
                    return (
                      <option value={id} key={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              )}
              {errors &&
                errors.map((el) => {
                  if (el.type === 'category') {
                    return (
                      <p key={nanoid()} className='text-red-500 text-[.95rem] '>
                        {el.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div>
            <label>
              Description <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              <input
                type='text'
                className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                placeholder='Description Cars'
                name='description'
                value={productForm.description}
                onChange={handleChange}
              />
              {errors &&
                errors.map((el) => {
                  if (el.type === 'description') {
                    return (
                      <p key={nanoid()} className='text-red-500 text-[.95rem] '>
                        {el.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div>
            <label>
              Price <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              <input
                type='number'
                className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                placeholder='Price cars'
                name='price'
                value={productForm.price}
                onChange={handleChange}
              />
              {errors &&
                errors.map((el) => {
                  if (el.type === 'price') {
                    return (
                      <p key={nanoid()} className='text-red-500 text-[.95rem] '>
                        {el.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>
          <div>
            <label>
              Main Image <span className='text-red-500'>*</span>
            </label>
            <div className='w-[700px]'>
              <input
                type='text'
                className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                placeholder='Image cars'
                name='mainImg'
                value={productForm.mainImg}
                onChange={handleChange}
              />
              {errors &&
                errors.map((el) => {
                  if (el.type === 'mainImg') {
                    return (
                      <p key={nanoid()} className='text-red-500 text-[.95rem] '>
                        {el.message}
                      </p>
                    );
                  }
                })}
            </div>
          </div>

          {inputImages?.map((el, index) => {
            return (
              <div key={index}>
                <label>Images</label>
                <div className='w-[700px] flex items-center gap-x-4'>
                  <input
                    type='text'
                    className='w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-200'
                    placeholder='Image cars'
                    name={index}
                    value={el}
                    onChange={(e) => handelInputImages(e.target.value, index)}
                  />
                  {index ? (
                    <button
                      type='button'
                      onClick={() => removeImagesField(index)}
                    >
                      <FaTrash className='text-red-500' />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
          <div>
            <div className='w-[700px]'>
              <button
                type='button'
                className='bg-gray-300 w-[45%] rounded-full px-4 py-4'
                placeholder='Image shoe'
                onClick={addImagesField}
              >
                Add Images
              </button>
            </div>
          </div>

          <div className='flex [&>*]:px-4 [&>*]:py-4 w-[700px] justify-between'>
            <button
              onClick={() => {
                navigate('/products');
              }}
              className='w-[45%] rounded-full border border-black'
              type='button'
            >
              Cancel
            </button>
            <button className='bg-gray-300 w-[45%] rounded-full'>
              {isEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
