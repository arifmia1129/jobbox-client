import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../../components/reusable/JobCard';
import Loading from '../../components/reusable/Loading';
import { useGetAppliedJobsQuery } from '../../features/job/jobApi';

const Chat = () => {
    const {
        user: { email },
    } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetAppliedJobsQuery(email);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="p-5">
            <h1 className='text-xl py-5'>Chat for your applied job</h1>
            <div className='grid grid-cols-2 gap-5 pb-5'>
                {data?.jobs?.map((job) => (
                    <JobCard job={job} />
                ))}
            </div>
        </div>
    );
};

export default Chat;