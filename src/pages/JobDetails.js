import React, { useState } from "react";

import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useApplyToJobMutation, useGetJobByIdQuery, useQueryMutation, useReplyMutation, useToggleJobStatusMutation } from "../features/job/jobApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const JobDetails = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");

  const navigate = useNavigate();

  const { data } = useGetJobByIdQuery(id, { pollingInterval: 1000 });

  const { job } = data || {};

  const { user: { email, role } } = useSelector(state => state.auth);

  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    email: employeeEmail,
    applicants,
    jobStatus
  } = job || {};

  const [apply] = useApplyToJobMutation();
  const [sendQuestion] = useQueryMutation();
  const [sendReply] = useReplyMutation();
  const [toggleJobStatus] = useToggleJobStatusMutation();

  const handleJobApply = () => {
    if (role === "employee") {
      return toast.error("Need a candidate account to apply job");
    }

    if (!email) {
      return navigate("/login");
    }

    if (!role) {
      return navigate("/register");
    }

    apply({ id: _id, email });
  }

  const handleSendQuestion = () => {
    const userQuestion = {
      email,
      jobId: _id,
      question
    }
    sendQuestion(userQuestion);
  }

  const handleReply = (email) => {
    sendReply({
      jobId: _id,
      reply,
      email
    })
  }

  const handleToggleJobStatus = (statusCode) => {
    toggleJobStatus({
      jobId: _id,
      statusCode
    })
  }

  const existApplicant = applicants?.find(application => application.email === email);

  return (
    <div className='pt-14 grid grid-cols-12 gap-5 p-20'>
      <div className='col-span-9 mb-10'>
        <div className='h-80 rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={meeting} alt='' />
        </div>
        <div className='space-y-5'>
          <div className='flex justify-between items-center mt-5'>
            <h1 className='text-xl font-semibold text-primary'>{position}</h1>
            <div>

              {
                (role === "employee" && jobStatus && email === employeeEmail) && <button onClick={() => handleToggleJobStatus(0)} className='btn mx-1'>Close Job</button>

              }

              {
                (role === "employee" && !jobStatus && email === employeeEmail) && <button onClick={() => handleToggleJobStatus(1)} className='btn mx-1'>Open Job</button>

              }
              {
                (role === "employee" && email === employeeEmail) && <button onClick={() => navigate(`/dashboard/applicants/${_id}`)} className='btn mx-1'>Chat With Applicants</button>

              }
              {
                (role === "employee" && email === employeeEmail) && <button onClick={() => navigate(`/dashboard/applicants/${_id}`)} className='btn mx-1'>Total Applicant</button>

              }
              {
                (role === "candidate" && jobStatus && !existApplicant) && <button onClick={handleJobApply} className='btn mx-1'>Apply</button>
              }
              {
                (role === "candidate" && existApplicant) && <p className="text-green-500">Already applied</p>
              }
            </div>
          </div>
          {
            (role === "employee" && email === employeeEmail) && <div>
              <h1 className='text-primary text-lg font-medium mb-3'>Total applicants</h1>
              <p>{applicants.length}</p>
            </div>
          }
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className='text-primary text-lg font-medium mb-3'>
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className='flex items-center'>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-5' />
        <div>
          <div>
            <h1 className='text-xl font-semibold text-primary mb-5'>
              General Q&A
            </h1>
            <div className='text-primary my-2'>
              {queries?.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className='text-lg font-medium'>{question}</p>
                  {reply?.map((item) => (
                    <p className='flex items-center gap-2 relative left-5'>
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {role === "employee" && <div className='flex gap-3 my-5'>
                    <input onChange={e => setReply(e.target.value)} placeholder='Reply' type='text' className='w-full' />
                    <button onClick={() => handleReply(email)} className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white' type="button">
                      <BsArrowRightShort size={30} />
                    </button>
                  </div>}
                </div>
              ))}
            </div>

            {
              role === "candidate" && <div className='flex gap-3 my-5'>
                <input
                  onChange={e => setQuestion(e.target.value)}
                  placeholder='Ask a question...'
                  type='text'
                  className='w-full'
                />
                <button onClick={handleSendQuestion} className='btn'>
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='col-span-3'>
        <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <p>Experience</p>
            <h1 className='font-semibold text-lg'>{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className='font-semibold text-lg'>{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className='font-semibold text-lg'>{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className='font-semibold text-lg'>{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className='font-semibold text-lg'>{location}</h1>
          </div>
        </div>
        <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
          <div>
            <h1 className='font-semibold text-lg'>{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className='font-semibold text-lg'>Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className='font-semibold text-lg'>2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className='font-semibold text-lg'>company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className='font-semibold text-lg'>Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className='font-semibold text-lg' href='#'>
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
