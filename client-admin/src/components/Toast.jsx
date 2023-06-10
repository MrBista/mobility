import Swal from 'sweetalert2';

const Toast = ({ message, type, timer }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer || 1000,
    timerProgressBar: true,
  });
  return Toast.fire({
    icon: type || 'success',
    title: message || 'success',
  });
};

export default Toast;
