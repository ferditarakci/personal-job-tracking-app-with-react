import React, { useContext, useState, useEffect, useCallback } from 'react'
import PrioritiesContext from '../../contexts/PrioritiesContext'
import JobContext from '../../contexts/JobContext'
import styles from './styles/job-filter.module.scss'

const JobFilter = () => {
	const { priorities } = useContext(PrioritiesContext)
	const { setJobs, getJobs, initialFormValues } = useContext(JobContext)

	const [filter, setFilter] = useState(initialFormValues)

	const onChangeElement = ({ target }) => {
		const { name, value } = target
		setFilter({ ...filter, [name]: (name === "priority" && value !== "" ? parseInt(value) : value.trim()) })
	}

	const filterJobs = useCallback(async filter => {
		try {
			const filteredName = data => data.filter(({ name }) => name.toString().toLowerCase().includes(filter.name))
			const filteredPriority = data => data.filter(({ priority }) => priority === filter.priority)

			let data = await getJobs()

			if (filter.name !== "") {
				data = await filteredName(data)
			}

			if (filter.priority !== "") {
				data = await filteredPriority(data)
			}

			setJobs(data)
		}
		catch (error) {
			console.log("An error has occurred!")
			console.log(error)
		}
	}, [getJobs, setJobs])

	useEffect(() => {
		filterJobs(filter)
	}, [filter, filterJobs])

	return (
		<div className={styles.wrapper}>
			<div className="row">
				<div className="col-12 col-sm-7">
					<input onInput={onChangeElement} name="name" placeholder="Job Name" data-testid="filterName" type="text" className="form-control mt-1" />
				</div>
				<div className="col-12 col-sm-5 mt-3 mt-sm-0">
					<select onChange={onChangeElement} name="priority" className="form-control mt-1" data-testid="filterPriority">
						<option value="">Priority (all)</option>
						{priorities.map(({ id, name }) => (<option value={id} key={id}>{name}</option>))}
					</select>
				</div>
			</div>
		</div>
	)
}

export default React.memo(JobFilter)