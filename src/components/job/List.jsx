import React, { useContext } from 'react'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PrioritiesContext } from '../../contexts/PrioritiesContext'
import { JobContext } from '../../contexts/JobContext'
import Filter from './Filter'
import './list.scss'

const JobList = () => {

	const Swal = withReactContent(SweetAlert)

	const { priorities } = useContext(PrioritiesContext)
	const { jobs, setJobs, getJobs } = useContext(JobContext)

	const PriorityName = props => {
		const el = priorities.find(el => el.id === props.id)
		return (<div className={`priority ${el?.css_class}`}>{el?.name}</div>)
	}

	const customSwal = Swal.mixin({
		width: 500,
		padding: '2rem',
		showConfirmButton: false,
		showCancelButton: true,
		reverseButtons: true,
		buttonsStyling: false,
		customClass: {
			cancelButton: 'swal-custom-btn swal-cancel btn btn-lg',
			confirmButton: 'swal-custom-btn swal-approve btn btn-lg ms-5'
		}
	})

	const editJob = el => {

		const { id, name, priority } = el

		const SwalContent = (
			<div className="container py-2">
				<div className="row text-start">
					<div className="col-12">
						<label htmlFor="editName">Job Name</label>
						<input value={name} id="editName" type="text" className="form-control mt-1" disabled />
					</div>
					<div className="col-12 mt-4">
						<label htmlFor="editPriority">Job Priority</label>
						<select defaultValue={priority} id="editPriority" className="form-control mt-1">
							<option value="">Choose</option>
							{priorities.map(el => (
								<option value={el.id} key={el.id}>{el.name}</option>
							))}
						</select>
					</div>
				</div>
			</div>
		)

		customSwal.fire({
			width: 560,
			title: 'Job Edit',
			html: SwalContent,
			showConfirmButton: true,
			confirmButtonText: 'Save',
			preConfirm: () => {
				let el = document.getElementById('editPriority')
				el.classList.remove('is-invalid')

				if (el.value === '') {
					el.classList.add('is-invalid')
					return false
				}
			}
		})
			.then(result => {
				if (result.isConfirmed) {

					let val = parseInt(document.getElementById('editPriority').value)

					const newJobs = jobs.map(obj => {
						if (obj.id === id) {
							return { ...obj, priority: val }
						}

						return obj
					})

					newJobs.sort((a, b) => {
						if (a.priority < b.priority) return -1
						else if (a.priority > b.priority) return 1
						return 0
					})

					localStorage.setItem(
						process.env.REACT_APP_LOCAL_STORAGE_KEY,
						JSON.stringify(newJobs)
					)

					setJobs(newJobs)

					customSwal.fire({
						icon: 'success',
						title: 'Job updated!',
						cancelButtonText: 'OK',
					})
				}
			})
	}

	const deleteJob = id => {
		customSwal.fire({
			icon: 'warning',
			iconColor: 'var(--pink)',
			title: 'Are you sure you want to delete it!',
			showConfirmButton: true,
			confirmButtonText: 'Approve',
		})
			.then(result => {
				if (result.isConfirmed) {
					const newJobs = jobs.filter(el => el.id !== id)

					localStorage.setItem(
						process.env.REACT_APP_LOCAL_STORAGE_KEY,
						JSON.stringify(newJobs)
					)

					setJobs(newJobs)

					customSwal.fire({
						icon: 'success',
						title: 'Job deleted!',
						cancelButtonText: 'OK',
					})
				}
			})
	}

	return (
		<section className="job-list">
			<div className="container">
				<div className="row">
					<div className="col-6">
						<h2 className="section-title">Job List</h2>
					</div>
					<div className="col-6 text-end">
						<small>({jobs.length}/{ getJobs().length })</small>
					</div>
				</div>
				<div className="list-wrapper">
					<Filter />
					<table className="table mb-0">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col" className="priorities">Priority</th>
								<th scope="col" className="actions">Action</th>
							</tr>
						</thead>
						<tbody className="border-top-0">
							{jobs.map(el => (
								<tr key={el.id}>
									<td>{el.name}</td>
									<td><PriorityName id={el.priority} /></td>
									<td className="actions">
										<button onClick={() => editJob(el)} className="btn">
											<i className="fa-solid fa-pencil"></i>
										</button>
										<button onClick={() => deleteJob(el.id)} className="btn ms-2">
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}

export default JobList