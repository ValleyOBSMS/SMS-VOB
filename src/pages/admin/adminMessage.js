import React from 'react';
import { IconFeatherTrash } from '../../images';

import Header from './components/header';

const AdminMessage = () => {
  return (
    <>
      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-backup-sec">
            <div className="container-fluid">

              <div className="user-backup-table-wrapp pt-5">
                <table className="custom-table">
                  <tr>
                    <th style={{ minWidth: '130px' }}>Date</th>
                    <th>Message</th>
                    <th className="text-center"></th>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Total Care Pharmacy, 1657 E. 6th St., Beaumont, CA 92223 Phone: 951- 769-3105</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Vail Ranch Pharmacy, 32675 Temecula Pkwy, Temecula, CA 92592, Phone 951-303-8300</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Please return to Valley OBGYN office</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Oceanside Pharmacy, 3601 Vista Way, Oceanside, CA 92056, (760) 231-5800, https://www.myoceansiderx.com/
                    </td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Temecula Yoga Collective, 26780 Ynez Ct. Suite B, Temecula, CA 92591 Phone: 951-290-2892, http://thetyc.com/</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>Hemet Valley Medical Center, 1117 E Devonshire Ave, Hemet, CA 92543, Phone:(951) 652-2811</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>04-06-2022</td>
                    <td>RUHS Riverside University Health System, 26520 Cactus Ave, Moreno Valley, CA 92555, Phone: (951) 486-4000</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </section>
        </main>
      </section>
    </>
  )
}

export default AdminMessage;
