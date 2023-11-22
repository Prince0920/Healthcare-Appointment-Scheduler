import React, { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '../../config/config.local';
import Layouts from '../../components/Layouts';
import axios from 'axios';
import { toast } from 'react-toastify';
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      let fetchApiUrl = SERVER_BASE_URL + '/api/v1/admin/allUsers';
      const res = await axios.get(fetchApiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        console.log(res.data.success);
        setAllUsers(res.data.data);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      let fetchApiUrl = SERVER_BASE_URL + '/api/v1/admin/changeAccountStatus';
      const res = await axios.post(
        fetchApiUrl,
        { recordUserId: record._id, status: status },
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.data);
        toast.success(res.data.message);
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
      toast.info('Something went wrong');
    }
  };

  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>All Users</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">DataTables</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Users</h3>
                  </div>
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers &&
                          allUsers.map((record, i) => (
                            <tr>
                              <td scope="row">{i + 1}</td>
                              <td>
                                {record.fullname.charAt(0).toUpperCase() +
                                  record.fullname.slice(1)}
                              </td>
                              <td>{record.email}</td>
                              <td>
                                {record.usertype.charAt(0).toUpperCase() +
                                  record.usertype.slice(1)}
                              </td>
                              <td>
                                {record.status == 'pending' ? (
                                  <button
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleAccountStatus(record, 'approved')
                                    }
                                  >
                                    Approve
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleAccountStatus(record, 'pending')
                                    }
                                  >
                                    Reject
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};
export default AllUsers;
