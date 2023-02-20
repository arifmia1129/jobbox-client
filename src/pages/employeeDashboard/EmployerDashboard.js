import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetJobsByEmailQuery } from "../../features/job/jobApi";

const EmployerDashboard = () => {
  const { user: { email } } = useSelector(state => state.auth);

  const { data, isLoading } = useGetJobsByEmailQuery(email);

  const { jobs } = data || {};

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="p-10">
      {
        jobs?.map(job => <JobCard key={job?._id} job={job} />)
      }
    </div>
  );
};

export default EmployerDashboard;
