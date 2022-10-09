import React from 'react';

import Header from './components/header';

const UserPanel = () => {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css" rel="stylesheet" />
      
      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-sms-form-sec">
            <div className="container-fluid">

              <div className="user-sms-form-wrapp">
                <div className="mdl-input-bx">
                  <label>Select Message</label>
                  <div className="select-input-bx select-input-message-wrapp">
                    <select name="" className="form-control" id="select-input-message">
                      <option value="">Select a Message...</option>
                      <option value="">Total Care Pharmacy, 1657 E. 6th St., Beaumont, CA 92223 Phone: 951- 769-3105</option>
                      <option value="">Vail Ranch Pharmacy, 32675 Temecula Pkwy, Temecula, CA 92592, Phone 951-303-8300</option>
                      <option value="">Please return to Valley OBGYN office</option>
                      <option value="">Oceanside Pharmacy, 3601 Vista Way, Oceanside, CA 92056, (760) 231-5800, https://www.myoceansiderx.com/</option>
                      <option value="">Temecula Yoga Collective, 26780 Ynez Ct. Suite B, Temecula, CA 92591 Phone: 951-290-2892, http://thetyc.com/</option>
                      <option value="">Hemet Valley Medical Center, 1117 E Devonshire Ave, Hemet, CA 92543, Phone:(951) 652-2811</option>
                      <option value="">RUHS Riverside University Health System, 26520 Cactus Ave, Moreno Valley, CA 92555, Phone: (951) 486-4000</option>
                      <option value="">Delta Drugs, 2497 E Lakeshore Dr., Lake Elsinore, CA 92530, Phone: (951) 245-9494</option>
                      <option value="">Nuevo Pharmacy, 75 W Nuevo Rd., Perris, CA 92571, Phone: (951) 322-4700</option>
                      <option value="">Rancho Pueblo Pharmacy, 31515 Rancho Pueblo Rd., Ste 105, Temecula, CA 92592, Phone: (951) 972-8822</option>
                      <option value="">Please text your name and email to Valley OBGYN at (951) 330-5875.</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="mdl-input-bx custom-message-wrapp">
                  <label>Custom Message</label>
                  <input type="text" name="" id="custom-message" className="form-control" autoComplete="off" required placeholder="Enter Custom Message" />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mdl-input-bx">
                      <label>Email</label>
                      <input type="text" name="" id="" className="form-control" autoComplete="off" required placeholder="Copy & paste only" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mdl-input-bx">
                      <label>Phone Number</label>
                      <input type="text" name="" id="" className="form-control" autoComplete="off" required placeholder="Copy & paste only" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="custom-btn text-uppercase" style={{ minWidth: '180px' }}>Send</button>
              </div>

            </div>
          </section>
        </main>

      </section>

    </>
  )
}

export default UserPanel;
