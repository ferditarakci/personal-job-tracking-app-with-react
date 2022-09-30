import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Swal = withReactContent(SweetAlert)

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

const CustomSwal = Swal.mixin({
	width: 500,
	padding: '2rem',
	showConfirmButton: false,
	showCancelButton: true,
	reverseButtons: true,
	buttonsStyling: false,
	customClass: {
		cancelButton: 'swal-custom-btn swal-cancel btn btn-lg',
		confirmButton: 'swal-custom-btn swal-approve btn btn-lg ms-3 ms-sm-5'
	}
})

export { Toast, CustomSwal }
export default Swal