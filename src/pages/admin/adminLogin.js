import React from 'react';
import { Logo } from '../../images';


const AdminLogin = () => {
    return (
        <>
            <section id="wrapper">
                <section className="common-sec login-page-sec">
                    <div className="container">
                        <div className="logo-dv text-center">
                            <a className="navbar-brand" href="index.php">
                                <span className="site-logo"><img src={Logo} alt="Logo" /></span>
                            </a>
                        </div>

                        <div className="login-form-dv">
                            <section className="custom-form-sec">
                                <form className="icon-form" action="" method="post">

                                    <div className="input-bx">
                                        <input type="text" name="username" id="username" className="form-control" autocomplete="off" required placeholder="Username" />
                                    </div>

                                    <div className="input-bx pass-bx">
                                        <input type="password" name="password" id="password" className="form-control" autocomplete="off" required placeholder="Password" />
                                    </div>

                                    <div className="text-end my-4">
                                        <a href onClick={e => e.preventDefault()}>Forgot Password</a>
                                    </div>

                                    <div className="submit mt-4">
                                        <button type="submit" className="custom-btn round-btn">Login</button>
                                    </div>

                                    
                                </form>
                            </section>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}

export default AdminLogin;
