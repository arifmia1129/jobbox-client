import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { _id, position, companyName, location, employmentType } =
    job || {};

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>
        {
          (pathname === "/jobs") && <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
            Details
          </button>
        }
        {
          (pathname === "/dashboard/employer") && <button className='btn' onClick={() => navigate(`/dashboard/applicants/${_id}`)}>
            Total Applicants
          </button>
        }
        {
          (pathname === "/dashboard/candidate-chat") && <button className='btn' onClick={() => navigate(`/dashboard/start-chat/${_id}`)}>
            Start Chat
          </button>
        }
      </div>
    </div>
  );
};

export default JobCard;
