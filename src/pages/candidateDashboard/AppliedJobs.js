import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const [sortBy, setSortBy] = useState("1");

  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery({ email, sort: sortBy }, { pollingInterval: 500 });



  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <h1 className='text-xl py-5'>Applied jobs</h1>
      <div className="my-2">
        {
          sortBy === "-1" ? <button onClick={() => setSortBy("1")} className='btn mx-1'>Sort by End Date</button>
            :
            <button onClick={() => setSortBy("-1")} className='btn mx-1'>Sort by Start Date</button>
        }
      </div>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {
          data?.jobs?.map((job) => (
            <JobCard job={job} />
          ))
        }
      </div>
    </div>
  );
};

export default AppliedJobs;
