import React, { useContext, useState } from 'react'
import Swal from '../../utils/SweetAlert'
import { PrioritiesContext } from '../../contexts/PrioritiesContext'
import { JobContext } from '../../contexts/JobContext'
import './create.scss'

const JobCreate = () => {

	const { priorities } = useContext(PrioritiesContext)
	const { jobs, setJobs } = useContext(JobContext)

	const [jobName, setJobName] = useState("")
	const [jobPriority, setJobPriority] = useState("")

	const [isLoading, setLoading] = useState(false)

	const formControl = e => {
		const el = e.target || e

		const { classList: css, value: val, name } = el

		css.remove('is-invalid')

		if (val.trim().length === 0 || val.length > 255) {
			css.add('is-invalid')
		}

		switch (name) {
			case 'name': setJobName(val); break
			case 'priority': setJobPriority(val); break
			default: break
		}
	}

	const lastId = () => {
		const newSort = jobs.sort((a, b) => {
			if (a.id < b.id) return 1
			else if (a.id > b.id) return -1
			return 0
		})

		if (newSort.length) {
			return newSort[0].id
		}

		return 0
	}

	const handleForm = e => {
		e.preventDefault()
		setLoading(true)

		const form = e.target
		Array.from(form).forEach(el => formControl(el))

		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})

		if (form.checkValidity()) {
			const add = {
				id: lastId() + 1,
				name: jobName,
				priority: parseInt(jobPriority)
			}

			const newJobs = [...jobs, add]

			localStorage.setItem(
				process.env.REACT_APP_LOCAL_STORAGE_KEY,
				JSON.stringify(newJobs)
			)

			newJobs.sort((a, b) => {
				if (a.priority < b.priority) return -1
				else if (a.priority > b.priority) return 1
				return 0
			})

			setJobs(newJobs)

			Toast.fire({
				icon: 'success',
				title: 'Job added!'
			})
		}
		else {
			Toast.fire({
				icon: 'error',
				title: 'Job could not be added!'
			})
		}

		setTimeout(() => {
			setLoading(false)
		}, 500)
	}

	return (
		<section className="create-job">
			<div className="container">
				<form onSubmit={(e) => handleForm(e)} noValidate>
					<div className="row pt-4 pb-2">
						<div className="col-12">
							<h2 className="section-title">Create New Job</h2>
						</div>
						<div className="col-12 col-sm-6 col-md-6 col-lg-7 mt-3 mt-sm-0">
							<label htmlFor="name">Job Name</label>
							<input onKeyUp={(e) => formControl(e)} name="name" id="name" data-testid="createJobName" type="text" className="form-control mt-1" required />
						</div>
						<div className="col-12 col-sm-3 col-md-4 col-lg-3 mt-3 mt-sm-0">
							<label htmlFor="priority">Job Priority</label>
							<select onChange={(e) => formControl(e)} name="priority" id="priority" data-testid="createJobPriority" className="form-control mt-1" required>
								<option value="" data-testid="select-option">Choose</option>
								{priorities.map(el => (<option value={el.id} key={el.id} data-testid="select-option">{el.name}</option>))}
							</select>
						</div>
						<div className="col-12 col-sm-3 col-md-2 col-lg-2 mt-3 mt-sm-0">
							<div className="d-none d-sm-block">&nbsp;</div>
							<button type="submit" data-testid="createFormSubmit" className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'} w-100 mt-1`} disabled={isLoading}>
								{
									isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fa-solid fa-plus me-2"></i>
								}
								Create
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

export default JobCreate