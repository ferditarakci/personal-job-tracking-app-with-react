import React, { useContext, useState } from 'react'
import { PrioritiesContext } from '../../contexts/PrioritiesContext'
import { JobContext } from '../../contexts/JobContext'
import './filter.scss'

const Filter = () => {
	const { priorities } = useContext(PrioritiesContext)
	const { setJobs, getJobs } = useContext(JobContext)

	const [searchJobName, setSearchJobName] = useState("")
	const [searchJobPriority, setSearchJobPriority] = useState("")

	const nameFilter = e => {
		let value = e.target.value.toLowerCase()

		setSearchJobName(value)

		let newList = getJobs()

		if (searchJobPriority !== "") {
			newList = newList.filter(el => el.priority === parseInt(searchJobPriority))
		}

		if (value !== "") {
			newList = newList.filter(el => el.name.toLowerCase().includes(value))
		}

		setJobs(newList)
	}

	const priorityFilter = e => {
		let value = e.target.value

		setSearchJobPriority(value)

		let newList = getJobs()

		if (searchJobName !== "") {
			newList = newList.filter(el => el.name.toLowerCase().includes(searchJobName))
		}

		if (value !== "") {
			newList = newList.filter(el => el.priority === parseInt(value))
		}

		setJobs(newList)
	}

	return (
		<div className="job-filter">
			<div className="row">
				<div className="col-12 col-sm-7">
					<input onKeyUp={(e) => nameFilter(e)} placeholder="Job Name" data-testid="filterName" type="text" className="form-control mt-1" />
				</div>
				<div className="col-12 col-sm-5 mt-3 mt-sm-0">
					<select onChange={(e) => priorityFilter(e)} className="form-control mt-1" data-testid="filterPriority">
						<option value="">Priority (all)</option>
						{priorities.map(el => (<option value={el.id} key={el.id}>{el.name}</option>))}
					</select>
				</div>
			</div>
		</div>
	)
}

export default Filter