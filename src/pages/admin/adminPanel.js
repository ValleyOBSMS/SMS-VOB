import React from 'react';
import { IconFeatherTrash } from '../../images';

import Header from './components/header';

const AdminPanel = () => {
  return (
    <>
      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-backup-sec">
            <div className="container-fluid">

              <div className="user-backup-table-wrapp user-admin-table-wrapp">
                <div className="user-popup-btns">
                  <button className="custom-btn" data-bs-toggle="modal" data-bs-target="#addNewUserModal">Add New User</button>
                  <button className="custom-btn" data-bs-toggle="modal" data-bs-target="#messageModal">Add New Message</button>
                  <button className="custom-btn" data-bs-toggle="modal" data-bs-target="#backupModal">Backup</button>
                  <button className="custom-btn">Disable Email</button>
                </div>

                <table className="custom-table">
                  <tr>
                    <th>Email</th>
                    <th>Passwords</th>
                    <th style={{minWidth: '200px'}}>History</th>
                    <th className="text-center"></th>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
                      <button className="tb-btn-smpl delete text-center">
                        <span className="icon"><img src={IconFeatherTrash} alt="Trash" /></span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>brandon.banks@mail.com</td>
                    <td>Walter@123</td>
                    <td>10 days</td>
                    <td>
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

      {/* AddNewUserModal */}
      <div className="modal fade custom-modal" id="addNewUserModal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close ml-auto" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Add New User</h3>
              <section className="custom-form-sec">
                <form className="icon-form" action="" method="post">
                  <div className="mdl-input-bx">
                    <label>Email</label>
                    <input type="text" name="" id="" className="form-control" autocomplete="off" required placeholder="Enter Email" />
                  </div>

                  <div className="mdl-input-bx">
                    <label>Password</label>
                    <input type="password" name="" id="" className="form-control" autocomplete="off" required placeholder="Enter Password" />
                  </div>

                  <div className="mdl-input-bx">
                    <label>History</label>
                    <select name="" className="form-control" id="">
                      <option value="7-days">0 Days</option>
                      <option value="7-days">7 Days</option>
                      <option value="30-days">30 Days</option>
                      <option value="90-days">90 Days</option>
                      <option value="180-days">180 Days</option>
                      <option value="365-days">365 Days</option>
                    </select>
                  </div>

                  <div className="mdl-input-bx">
                    <label>IP Address (Optional)</label>
                    <input type="text" name="" id="" className="form-control" autocomplete="off" placeholder="Enter IP Address" />
                  </div>

                  <button type="submit" className="custom-btn popSubmit">Add</button>
                </form>
              </section>
            </div>
            
          </div>
        </div>
      </div>

      {/* Modal backup */}
      <div className="modal fade custom-modal" id="backupModal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close ml-auto" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Backup</h3>
              <section className="custom-form-sec">
                <form className="icon-form" action="" method="post">
                  <div className="mdl-input-bx">
                    <label>Enter Backup Email</label>
                    <input type="text" name="" id="" className="form-control" autocomplete="off" required placeholder="Enter Backup Email" />
                  </div>

                  <button type="submit" className="custom-btn popSubmit">Backup</button>
                </form>
              </section>
            </div>

          </div>
        </div>
      </div>

      {/* Modal message */}
      <div className="modal fade custom-modal" id="messageModal" tabindex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close ml-auto" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Add New Message</h3>
              <section className="custom-form-sec">
                <form className="icon-form" action="" method="post">
                  <div className="mdl-input-bx">
                    <label>New Message</label>
                    <textarea required placeholder="Enter New Message" className="form-control"></textarea>
                  </div>

                  <button type="submit" className="custom-btn popSubmit">ADD Message</button>
                </form>
              </section>
            </div>

          </div>
        </div>
      </div>
          
    </>
  )
}

export default AdminPanel;
