import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useLoginMutation } from '../services/MOBILITYAPI.JS';
import { useRegisterMutation } from '../services/MOBILITYAPI.JS';
import { nanoid } from '@reduxjs/toolkit';
import { BiHide, BiShow } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Toast from '../components/Toast';

const FormUser = ({ registerPage }) => {
  // state
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    lastName: '',
    firstName: '',
  });
  const [errors, setErrors] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // variabel
  const navigate = useNavigate();

  // fetch rtk
  const [
    doLogin,
    {
      data: dataLogin,
      isError: isErrLogin,
      error: errLogin,
      isSuccess: isSucLogin,
      isLoading: isLoadLogin,
    },
  ] = useLoginMutation();
  const [
    doRegister,
    {
      data: dataRegister,
      isError: isErrRegister,
      error: errRegister,
      isSuccess: isSucRegister,
      isLoading: isLoadRegister,
    },
  ] = useRegisterMutation();

  // function
  const handleChange = (e) => {
    setUserForm((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const handelFormUser = async (e) => {
    e.preventDefault();

    try {
      const { email, firstName, lastName, username, password } = userForm;
      const message = [];
      if (!email) {
        message.push({ type: 'email', message: 'Email harus diisi' });
      }
      if (!password) {
        message.push({ type: 'password', message: 'Password harus diisi' });
      }
      if (!registerPage) {
        if (message.length) {
          throw { name: 'bad request', code: 400, message };
        }
        doLogin(userForm);
      } else {
        if (!username) {
          message.push({ type: 'username', message: 'Username harus diisi' });
        }
        if (password && password.length < 5) {
          message.push({
            type: 'password',
            message: 'Password minimal 5 karakter',
          });
        }
        if (message.length) {
          throw { name: 'bad request', code: 400, message };
        }
        doRegister(userForm);
      }
    } catch (err) {
      // console.log(err);
      setErrors(err.message);
    }
  };

  // side effect
  useEffect(() => {
    if (isSucLogin) {
      localStorage.setItem('access_token', dataLogin.access_token);
      Toast({
        message: `successfully login`,
        timer: 3000,
      });
      navigate('/');
    }
  }, [isSucLogin]);
  useEffect(() => {
    if (isErrLogin && errLogin.status === 401) {
      setErrors([{ type: 'password', message: 'Password is incorrect' }]);
    }
  }, [isErrLogin, errLogin]);

  useEffect(() => {
    if (isSucRegister) {
      Toast({
        message: `successfully create account for ${userForm.email}`,
        timer: 3000,
      });
      setUserForm({
        username: '',
        email: '',
        password: '',
        lastName: '',
        firstName: '',
      });
      setErrors([]);
    }
  }, [isSucRegister]);

  // useEffect(() => {
  //   if (isErrRegister) {
  //     console.log(errRegister);
  //   }
  // }, [isErrRegister]);

  return (
    <>
      {isLoadLogin && <Loader />}
      {isLoadRegister && <Loader />}
      <div className='m-auto w-[400px]  mt-[7rem]'>
        <div className='flex flex-col items-center gap-y-4'>
          <AiFillCar className='text-[4rem]' />
          <h3 className='uppercase text-[1.3rem] w-[250px] leading-tight text-center'>
            {registerPage
              ? 'Create Another Admin For Adidas'
              : 'Login For only Admin'}
          </h3>

          <form onSubmit={handelFormUser}>
            <div>
              <input
                type='text'
                placeholder='Email address'
                className='border w-full px-4 py-2 outline-none '
                name='email'
                value={userForm.email}
                onChange={handleChange}
              />
              {errors &&
                errors.map((el) => {
                  return (
                    el.type === 'email' && (
                      <p
                        key={nanoid()}
                        className='text-red-500 text-lg text-left text-[.9rem]'
                      >
                        {el.message}
                      </p>
                    )
                  );
                })}
            </div>

            <div className='mt-3'>
              <div className='w-full px-4 py-2 border flex justify-between items-center'>
                <input
                  type={!isShowPassword ? 'password' : 'text'}
                  placeholder='Password'
                  className='outline-none w-full'
                  name='password'
                  value={userForm.password}
                  onChange={handleChange}
                />
                {!isShowPassword ? (
                  <button onClick={() => setIsShowPassword(true)} type='button'>
                    <BiShow className='text-[1.4rem]' />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsShowPassword(false)}
                    type='button'
                  >
                    <BiHide className='text-[1.4rem]' />
                  </button>
                )}
              </div>
              {errors &&
                errors.map((el) => {
                  return (
                    el.type?.toLowerCase() === 'password' && (
                      <p
                        key={nanoid()}
                        className='text-red-500 text-lg text-left text-[.9rem]'
                      >
                        {el.message}
                      </p>
                    )
                  );
                })}
            </div>
            {registerPage && (
              <div className='mt-3'>
                <input
                  type='text'
                  placeholder='username'
                  className='border w-full px-4 py-2 outline-none'
                  name='username'
                  value={userForm.username}
                  onChange={handleChange}
                />
                {errors &&
                  errors.map((el) => {
                    return (
                      el.type === 'username' && (
                        <p
                          key={nanoid()}
                          className='text-red-500 text-lg text-left text-[.9rem]'
                        >
                          {el.message}
                        </p>
                      )
                    );
                  })}
              </div>
            )}
            {registerPage && (
              <input
                type='text'
                placeholder='First Name'
                className='border w-full px-4 py-2 outline-none mt-3'
                name='firstName'
                value={userForm.firstName}
                onChange={handleChange}
              />
            )}
            {registerPage && (
              <input
                type='text'
                placeholder='Last Name'
                className='border w-full px-4 py-2 outline-none mt-3'
                name='lastName'
                value={userForm.lastName}
                onChange={handleChange}
              />
            )}

            <button className='mt-4 bg-black text-white w-full px-4 py-2 rounded'>
              {registerPage ? 'Register' : ' Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormUser;
