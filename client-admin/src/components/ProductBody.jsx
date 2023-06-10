import React, { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useDeleteProductMutation } from '../services/MOBILITYAPI.JS';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { useDispatch } from 'react-redux';
import { doEditProduct } from '../features/product/productSlice';
import { GrUpdate } from 'react-icons/gr';

const ProductBody = ({
  id,
  name,
  slug,
  mainImg,
  price,
  updatedAt,
  Category,
  User,
  no,
  Images,
  description,
}) => {
  // variabel
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetch rtk
  const [
    doDelete,
    { isLoading: isLoadDel, data, isError, error, isSuccess: isSucDel },
  ] = useDeleteProductMutation();
  // function
  const handleDelete = () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          doDelete({ idProduct: id });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const toEditProduct = () => {
    navigate(`/product?product_id=${id}`);
  };

  // side effect
  useEffect(() => {
    if (isError) {
      console.log(error, '<=== ini errornya');
    }
  }, [isError]);
  useEffect(() => {
    if (isSucDel) {
      Toast({
        message: 'successfully delete item' + name,
        type: 'success',
        timer: 3000,
      });
    }
  }, [isSucDel]);

  return (
    <tr>
      <td className='text-center w-12'>{no}</td>
      <td>
        <p>{name}</p>
      </td>
      <td className='text-left'>
        <p>{Category.name}</p>
      </td>
      <td className='text-left'>
        <div className='h-24 w-36 aspect-video'>
          <img
            src={
              mainImg ||
              'https://images.unsplash.com/photo-1682687220945-922198770e60?'
            }
            className='h-[100%] w-[100%] object-contain'
            alt=''
          />
        </div>
      </td>

      <td>
        <p>{price}</p>
      </td>
      <td>
        <p>{User.email}</p>
      </td>

      <td className='text-center'>
        <button onClick={toEditProduct}>
          <GrUpdate />
        </button>
      </td>
      <td className='text-center'>
        <button onClick={handleDelete}>
          <MdDelete className='text-[1.5rem] block text-red-400' />
        </button>
      </td>
    </tr>
  );
};

export default ProductBody;
