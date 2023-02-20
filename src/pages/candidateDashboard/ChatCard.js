import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery, useReplyToMessageMutation, useSendMessageMutation } from '../../features/job/jobApi';
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";

const ChatCard = () => {
    const { id } = useParams();
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

    const myMessages = applicants?.find(applicant => applicant.email === email);

    const [message, setMessage] = useState("");
    const [replyMsg, setReplyMsg] = useState("");

    const [sendMessage] = useSendMessageMutation();
    const [sendReplyToMessage] = useReplyToMessageMutation();


    const handleSendMessage = () => {
        const msg = {
            email,
            jobId: _id,
            message
        }
        sendMessage(msg);
    }
    return (
        <div className='p-5'>
            <div>
                {
                    <div className='text-primary my-2'>
                        {myMessages?.message?.map(({ message, _id: msgId, reply }) => (
                            <div>
                                <p className='text-lg font-medium'>{message}</p>
                                {reply?.map((item) => (
                                    <p className='flex items-center gap-2 relative left-5'>
                                        <BsArrowReturnRight /> {item}
                                    </p>
                                ))}

                                <div className='flex gap-3 my-5'>
                                    <input onChange={e => { setReplyMsg(e.target.value) }} placeholder='Reply' type='text' className='w-full' />
                                    <button onClick={() => {
                                        const msg = {
                                            email,
                                            jobId: _id,
                                            reply: replyMsg,
                                            msgId
                                        }
                                        sendReplyToMessage(msg);
                                    }} className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white' type="button">
                                        <BsArrowRightShort size={30} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex gap-3 my-5'>
                <input
                    onChange={e => { setMessage(e.target.value) }}
                    placeholder='Write message...'
                    type='text'
                    className='w-full'
                />
                <button onClick={handleSendMessage} className='btn'>
                    <BsArrowRightShort size={30} />
                </button>
            </div>
        </div>
    );
};

export default ChatCard;