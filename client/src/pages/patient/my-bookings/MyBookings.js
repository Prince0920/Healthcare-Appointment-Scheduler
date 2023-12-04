import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import axios from 'axios';
import { Button, Table, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Spinner from '../../../components/Spinner';
import { SERVER_BASE_URL } from '../../../config/config.local';
import { toast } from 'react-toastify';

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
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Popconfirm
            title='Are you sure you want to cancel?'
            onConfirm={() => handleCancelAppointment(record._id)}
            okText='Yes'
            cancelText='No'
            disabled={record.status !== 'scheduled'} // Disable the Popconfirm based on condition
          >
            <Button
              type='danger'
              style={{
                background: record.status !== 'scheduled' ? '#f0f0f0' : 'red',
                color: record.status !== 'scheduled' ? '#a9a9a9' : 'white',
              }}
              disabled={record.status !== 'scheduled'}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCancelAppointment = recordId => {
    axios
      .delete(SERVER_BASE_URL + '/api/v1/my-bookings?appointmentId=' + recordId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        if (res.status) {
          toast.success(res.data.message);
          getAllBookings();
        }
      })
      .catch(e => {
        console.log('Error: ', e);
      });
  };
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
