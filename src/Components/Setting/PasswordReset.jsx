import React, { useState, useCallback } from 'react';
import SendOtp from './SendOtp';
import ChangePassword from './ChangePassword';

const PasswordReset = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');

    const handleOtpSent = useCallback((email) => {
        setOtpSent(true);
        setEmail(email);
    }, []);

    return (
        <div className="password-reset">
            {!otpSent ? (
                <SendOtp onOtpSent={handleOtpSent} />
            ) : (
                <ChangePassword email={email} />
            )}
        </div>
    );
};

export default PasswordReset;
