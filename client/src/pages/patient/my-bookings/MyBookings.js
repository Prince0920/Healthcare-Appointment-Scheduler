import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import axios from 'axios';
import { Table } from 'antd';
import Spinner from '../../../components/Spinner';
import { SERVER_BASE_URL } from '../../../config/config.local';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBookings = async () => {
    setIsLoading(true);
    axios
      .get(SERVER_BASE_URL + '/api/v1/my-bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(bookings_data => {
        setBookings(bookings_data.data.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  //   const dataSource = [
  //     {
  //       key: '1',
  //       name: 'Mike',
  //       age: 32,
  //       address: '10 Downing Street',
  //     },
  //     {
  //       key: '2',
  //       name: 'John',
  //       age: 42,
  //       address: '10 Downing Street',
  //     },
  //   ];

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctorFullName',
      key: 'doctorFullName',
    },
    {
      title: 'Doctor Contact No.',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Appointments'
          bredCumName='Appointments'
        />
        <section className='content'>
          <div className='container-fluid'>
            {isLoading ? (
              <Spinner />
            ) : (
              <Table
                dataSource={bookings}
                columns={columns}
                pagination={false}
              />
            )}
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default MyBookings;
