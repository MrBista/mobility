import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDeleteCategoryMutation } from '../services/MOBILITYAPI.JS';
import Toast from './Toast';
import Swal from 'sweetalert2';
import { GrUpdate } from 'react-icons/gr';

const CategoryBody = ({ id, name, createdAt, updatedAt, no }) => {
  // variabel
  const navigate = useNavigate();

  // fetch rtk
  const [
    doDelete,
    { isLoading: isLoadDel, isSuccess: isSucDel, isError, error },
  ] = useDeleteCategoryMutation();

  // function
  const handleDelete = async () => {
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
          doDelete({ idCategory: id });
        }
      });
    } catch (err) {}
  };
  const toCategory = async () => {
    navigate('/category?category_id=' + id);
  };

  //side effect

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
    <tr className='[&>*]:px-4 [&>*]:py-2'>
      <td className='text-center w-12'>{no}</td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p>{createdAt.slice(0, 10)}</p>
      </td>
      <td>
        <p>{updatedAt.slice(0, 10)}</p>
      </td>
      <td className='text-end '>
        <button onClick={() => toCategory(id)}>
          <GrUpdate className='animate-pulse' />
        </button>
      </td>
      <td className='text-end'>
        <button onClick={() => handleDelete(id)}>
          <FaTrash className='text-red-500' />
        </button>
      </td>
    </tr>
  );
};

export default CategoryBody;
