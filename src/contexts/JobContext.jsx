import { createContext, useState, useEffect } from 'react'

const JobContext = createContext()

const initialFormValues = {
	name: "",
	priority: ""
}

const sortByPriorities = data => {
	return data.sort((a, b) => {
		if (a.priority < b.priority) return -1
		else if (a.priority > b.priority) return 1
		return 0
	})
}

const saveToLocalStorage = data => {
	localStorage.setItem(
		process.env.REACT_APP_LOCAL_STORAGE_KEY,
		JSON.stringify(data)
	)
}

const getJobs = () => {
	try {
		let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
		data = JSON.parse(data) || []
		sortByPriorities(data)
		return data
	}
	catch (error) {
		return []
	}
}

const JobProvider = ({ children }) => {
	const [jobs, setJobs] = useState([])

	useEffect(() => {
		setJobs(getJobs())
	}, [])

	const values = {
		jobs,
		setJobs,
		getJobs,
		initialFormValues,
		sortByPriorities,
		saveToLocalStorage
	}

	return (
		<JobContext.Provider value={values}>
			{children}
		</JobContext.Provider>
	)
}

export { JobProvider }
export default JobContext 