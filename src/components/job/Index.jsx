import React from 'react'
import JobCreate from './JobCreate'
import JobList from './JobList'

const Job = () => {
	return (
		<React.Fragment>
			<JobCreate />
			<JobList />
		</React.Fragment>
	)
}

export default Job