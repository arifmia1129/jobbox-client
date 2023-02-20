import React, { useState } from 'react';
import { useGetUserByEmailQuery } from '../../features/auth/authApi';
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useReplyToMessageMutation, useSendMessageMutation } from '../../features/job/jobApi';

const ApplicantCard = ({ applicant, jobId }) => {
    const { email, message: allMessage } = applicant || {};
    const { data } = useGetUserByEmailQuery(email);



    const [message, setMessage] = useState("");
    const [replyMsg, setReplyMsg] = useState("");

    const [sendMessage] = useSendMessageMutation();
    const [sendReplyToMessage] = useReplyToMessageMutation();

    const { user } = data || {};

    const { firstName, lastName, address, country, gender } = user || {};


    const handleSendMessage = () => {
        const msg = {
            email,
            jobId,
            message
        }
        sendMessage(msg);
    }


    return (
        <div
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary m-5'
        >
            <div className='flex justify-between  text-primary'>
                <div>
                    <p className='text-xl'>{firstName} {lastName}</p>
                    <small className='text-primary/70 '>

                        <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                            {`${address}, ${country}`}
                        </span>
                        <p>Gender: {gender}</p>
                    </small>
                </div>
            </div>
            <div>
                {
                    <div className='text-primary my-2'>
                        {allMessage?.map(({ message, _id, reply }) => (
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
                                            jobId,
                                            reply: replyMsg,
                                            msgId: _id
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

export default ApplicantCard;