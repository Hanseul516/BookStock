// Notice.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notice.css'; // Notice.css 파일 import

const Notice = ({ message, type }) => {
    const notify = () => {
        toast[type](message);
    };

    return (
        <div className='header-notice'>
            <button type="button" onClick={notify} className="btn btn-primary position-relative custom-button text-secondary-emphasis-notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="dimgray" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                </span>
            </button>

            <ToastContainer />
        </div>
    );
};

export default Notice;
