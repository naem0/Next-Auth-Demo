'use client';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CustomSignInForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); 
    
    useEffect(() => {
        const checkExistence = async () => {
            try {
                if (phone.length == 11) {
                    console.log(phone.length)
                    const response = await fetch('https://v3.nagadhat.com/api/check-phone-exists', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phone }),
                    });

                    const numberExists = await response.json();
                    console.log({ numberExists });
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkExistence();
    }, [phone]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            name,
            phone,
            email,
            password,
            gender
        });

        if (result?.ok) {
            console.log({result})
            router.push('/otp');
        } else {
            console.error('Sign in failed');
            console.log({result})
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Responsive Registration Form</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="">
                            <div className="input_field"> 
                                <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                <input 
                                    type="text"
                                    name="name" 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Name" 
                                />
                            </div>
                            <div className="input_field"> 
                                <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email" 
                                    required 
                                />
                            </div>
                            <div className="input_field"> 
                                <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone" 
                                    required 
                                />
                            </div>
                            <div className="input_field"> 
                                <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" 
                                    required 
                                />
                            </div>
                            
                            <div className="input_field radio_option">
                                <input 
                                type="radio" 
                                name="gender" 
                                id="rd1" 
                                value="Male" 
                                onChange={(e) => setGender(e.target.value)}
                                />

                                <label htmlFor="rd1">Male</label>
                                <input 
                                type="radio" 
                                name="gender" 
                                id="rd2" 
                                value="Female" 
                                onChange={(e) => setGender(e.target.value)}
                                />
                                <label htmlFor="rd2">Female</label>
                            </div>

                            <input className="button" type="submit" value="Register" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CustomSignInForm;
