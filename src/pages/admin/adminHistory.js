import React from 'react';
import { IconFeatherTrash } from '../../images';

import Header from './components/header';

const AdminHistory = () => {
  return (
    <>
      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-backup-sec">
            <div className="container-fluid">

              <div className="user-backup-table-wrapp pt-5" style={{
                marginLeft: '100px'
              }}>
                <table className="custom-table">

                  <tr>
                    <th>#</th>
                    <th>Date & Time</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Message</th>
                    <th className="text-center position-relative">
                      <button className="custom-btn popSubmit" style={{ 
                        position: 'absolute', 
                        top: '-50px', 
                        left: '-33px', 
                        right: '0', 
                        margin: '0 auto', 
                        maxWidth: '230px', 
                        padding: '10px 20px', 
                        width: '136px' 
                        }}>
                        Clear History
                      </button>
                      <span>Delete</span>

                    </th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td><span>04-06-2022</span> &nbsp;&nbsp; <span>1 14:43:12</span></td>
                    <td><a href onClick={e => e.preventDefault()}>macanderson@gmail.com</a></td>
                    <td>787 787 7878</td>
                    <td>Delta Drugs, 2497 E Lakeshore Dr. Lake Elsinore, CA 92530, Phone: (951) 245 9494</td>
                    <td className="text-center">
                      <button className="tb-btn-smpl download">
                        <span className="icon"><img src={IconFeatherTrash} alt="Download" /></span>
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

export default AdminHistory;
