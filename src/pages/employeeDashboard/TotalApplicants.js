import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicantCard from '../../components/reusable/ApplicantCard';
import { useGetJobByIdQuery } from '../../features/job/jobApi';

const TotalApplicants = () => {
    const { id } = useParams();

    const { data } = useGetJobByIdQuery(id);

    const { job } = data || {};


    const {
        _id,
        applicants
    } = job || {};
    return (
        <div>
            {
                applicants?.map(applicant => <ApplicantCard jobId={_id} key={applicant._id} applicant={applicant} />)
            }
        </div>
    );
};

export default TotalApplicants;