import React, { useState, useEffect } from 'react'
import { PrioritiesContext } from '../../contexts/PrioritiesContext'
import { JobContext } from '../../contexts/JobContext'
import JobCreate from './Create'
import JobList from './List'

const Job = () => {

	const [priorities, setPriorities] = useState([])
	const [jobs, setJobs] = useState([])

	const getPriorities = () => {
		fetch(`${process.env.REACT_APP_API_URL}/priorities.json`)
			.then(response => response.json())
			.then(response => setPriorities(response))
			.catch(error => console.error('getPriorities', error))
	}

	const getJobs = () => {
		// fetch(`${process.env.REACT_APP_API_URL}/jobs.json`)
		// 	.then(response => response.json())
		// 	.then(response => setJobs(response))
		// 	.catch(error => console.error('getJobs', error))

		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
		data = JSON.parse(data) || []

		data.sort((a, b) => {
			if (a.priority < b.priority) return -1
			else if (a.priority > b.priority) return 1
			return 0
		})

		return data
	}

	useEffect(() => {
		getPriorities()
		setJobs(getJobs())
	}, [])

	return (
		<PrioritiesContext.Provider value={{ priorities, setPriorities }}>
			<JobContext.Provider value={{ jobs, setJobs, getJobs }}>
				<JobCreate />
				<JobList />
			</JobContext.Provider>
		</PrioritiesContext.Provider>
	)
}

export default Job