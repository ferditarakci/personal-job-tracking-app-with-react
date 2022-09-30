import React, { useContext, useState, useEffect } from 'react'
import { Toast } from '../../utils/SweetAlert'
import PrioritiesContext from '../../contexts/PrioritiesContext'
import JobContext from '../../contexts/JobContext'
import styles from './styles/job-create.module.scss'

const formControl = ({ classList, value }) => {
	classList.remove('is-invalid')

	if (value.trim().length === 0 || value.length > 255) {
		classList.add('is-invalid')
	}
}

const lastId = data => {
	data = JSON.parse(JSON.stringify(data))

	data.sort((a, b) => {
		if (a.id < b.id) return 1
		else if (a.id > b.id) return -1
		return 0
	})

	return data.length ? data[0].id : 0
}

const JobCreate = () => {

	const { priorities } = useContext(PrioritiesContext)
	const { jobs, setJobs, initialFormValues, sortByPriorities, saveToLocalStorage } = useContext(JobContext)

	const [createJob, setCreateJob] = useState(initialFormValues)
	const [isLoading, setIsLoading] = useState(false)
	const [addedItem, setAddedItem] = useState(false)

	const onChangeElement = ({ target }) => {
		const { name, value } = target

		setCreateJob({ ...createJob, [name]: (name === "priority" ? parseInt(value) : value) })

		formControl(target)
	}

	const handleForm = e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const form = e.target
			Array.from(form).forEach(el => formControl(el))
	
			if (form.checkValidity()) {
				const { name, priority } = createJob
	
				const newItem = {
					id: lastId(jobs) + 1,
					name,
					priority
				}
	
				const newJobs = [...jobs, newItem]
	
				sortByPriorities(newJobs)
	
				saveToLocalStorage(newJobs)
	
				setJobs(newJobs)
	
				setAddedItem(true)
	
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
				setIsLoading(false)
			}, 300)
		}
		catch (error) {
			Toast.fire({
				icon: 'error',
				title: 'An error has occurred!'
			})

			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (addedItem) {
			setCreateJob(initialFormValues)
		}
		return () => setAddedItem(false)
	}, [addedItem, initialFormValues])

	return (
		<section className={styles.wrapper}>
			<div className="container">
				<form onSubmit={handleForm} noValidate>
					<div className="row pt-4 pb-2">
						<div className="col-12">
							<h2 className="section-title">Create New Job</h2>
						</div>
						<div className="col-12 col-sm-6 col-md-6 col-lg-7 mt-3 mt-sm-0">
							<label htmlFor="createJobName">Job Name</label>
							<input onInput={onChangeElement} value={createJob.name} name="name" id="createJobName" data-testid="createJobName" className="form-control mt-1" type="text" required />
						</div>
						<div className="col-12 col-sm-3 col-md-4 col-lg-3 mt-3 mt-sm-0">
							<label htmlFor="createJobPriority">Job Priority</label>
							<select onChange={onChangeElement} value={createJob.priority} name="priority" id="createJobPriority" data-testid="createJobPriority" className="form-control mt-1" required>
								<option value="" data-testid="select-option">Choose</option>
								{priorities.map(({ id, name }) => (<option value={id} key={id} data-testid="select-option">{name}</option>))}
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