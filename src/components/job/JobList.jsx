import React, { useContext, useEffect } from 'react'
import { CustomSwal } from '../../utils/SweetAlert'
import PrioritiesContext from '../../contexts/PrioritiesContext'
import JobContext from '../../contexts/JobContext'
import styles from './styles/job-list.module.scss'
import JobFilter from './JobFilter'

const JobList = () => {

	const { priorities } = useContext(PrioritiesContext)
	const { jobs, setJobs, getJobs, sortByPriorities, saveToLocalStorage } = useContext(JobContext)

	const PriorityName = ({ id }) => {
		if (!priorities.length) return false
		const { name, css_class } = priorities.find(el => el.id === id)
		return (<div className={`${styles.priority} ${css_class}`}>{name}</div>)
	}

	const editJob = ({ id, name, priority }) => {

		const SwalContent = (
			<div className="container py-2">
				<div className="row text-start">
					<div className="col-12">
						<label htmlFor="editJobName">Job Name</label>
						<input value={name} id="editJobName" type="text" className="form-control mt-1" disabled />
					</div>
					<div className="col-12 mt-4">
						<label htmlFor="editJobPriority">Job Priority</label>
						<select defaultValue={priority} id="editJobPriority" className="form-control mt-1">
							<option value="">Choose</option>
							{priorities.map(({ id, name }) => (<option value={id} key={id}>{name}</option>))}
						</select>
					</div>
				</div>
			</div>
		)

		CustomSwal.fire({
			title: 'Job Edit',
			html: SwalContent,
			showConfirmButton: true,
			confirmButtonText: 'Save',
			preConfirm: () => {
				const el = document.getElementById('editJobPriority')
				el.classList.remove('is-invalid')

				if (el.value === '') {
					el.classList.add('is-invalid')
					return false
				}
			}
		})
			.then(result => {
				if (result.isConfirmed) {
					const value = parseInt(document.getElementById('editJobPriority').value)

					const newJobs = jobs.map(obj => {
						if (obj.id === id) {
							return { ...obj, priority: value }
						}
						return obj
					})

					sortByPriorities(newJobs)

					saveToLocalStorage(newJobs)

					setJobs(newJobs)

					CustomSwal.fire({
						icon: 'success',
						title: 'Job updated!',
						cancelButtonText: 'OK',
					})
				}
			})
	}

	const deleteJob = id => {
		CustomSwal.fire({
			icon: 'warning',
			iconColor: 'var(--pink)',
			title: 'Are you sure you want to delete it!',
			showConfirmButton: true,
			confirmButtonText: 'Approve'
		})
			.then(result => {
				if (result.isConfirmed) {
					const newJobs = jobs.filter(el => el.id !== id)

					localStorage.setItem(
						process.env.REACT_APP_LOCAL_STORAGE_KEY,
						JSON.stringify(newJobs)
					)

					setJobs(newJobs)

					CustomSwal.fire({
						icon: 'success',
						title: 'Job deleted!',
						cancelButtonText: 'OK',
					})
				}
			})
	}

	return (
		<section className={styles.wrapper}>
			<div className="container">
				<div className="row">
					<div className="col-6">
						<h2 className="section-title">Job List</h2>
					</div>
					<div className="col-6 text-end">
						<small>({jobs.length}/{getJobs().length})</small>
					</div>
				</div>
				<div className={styles.tableWrapper}>
					<JobFilter />
					<table className={`${styles.table} table mb-0`}>
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col" className={styles.priorities}>Priority</th>
								<th scope="col" className={styles.actions}>Action</th>
							</tr>
						</thead>
						<tbody className="border-top-0">
							{jobs.map(({ id, name, priority }) => (
								<tr key={id}>
									<td>{name}</td>
									<td><PriorityName id={priority} /></td>
									<td className={styles.actions}>
										<button onClick={() => editJob({ id, name, priority })} className="btn">
											<i className="fa-solid fa-pencil"></i>
										</button>
										<button onClick={() => deleteJob(id)} className="btn ms-2">
											<i className="fa-solid fa-trash-can"></i>
										</button>
									</td>
								</tr>
							))}

							{!jobs.length && (
								<tr>
									<td colSpan="3" className={styles.notFound}>Job not found, add a new job!</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}

export default JobList