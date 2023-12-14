import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import axios from 'axios';
import { Button, Table, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Spinner from '../../../components/Spinner';
import moment from 'moment'; // Import moment library
import { SERVER_BASE_URL } from '../../../config/config.local';
import { toast } from 'react-toastify';
import PdfUpload from '../../../components/forms/PdfUpload';
import { FilePdfOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailModelVisible, setIsDetailModelVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

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

  const handleUploadPdf = async (data, patientDetailId) => {
    alert('handleUploadPdf');
    try {
      const formData = new FormData();
      formData.append('avatar', data);
      formData.append('patientDetailId', patientDetailId);

      // Make the API call
      const response = await axios.put(
        SERVER_BASE_URL + '/api/v1/my-bookings/medical-report',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Profile Image saved success!!');
      } else {
        toast.success('Please try again..');
      }
      // Handle the API response as needed
    } catch (error) {
      console.error('API Error:', error);
      // Handle API error
    }
  };

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
      title: 'Appointment Date',
      key: 'appointmentDate',
      render: (text, record) => moment(record.appointmentDate).format('YYYY-MM-DD'), // Format the date
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Doctor Response',
      key: 'message',
      render: (text, record) => <p>{record.message ? record.message : '-'}</p>,
    },
    // {
    //   title: 'Upload Reports',
    //   key: 'reports',
    //   render: (text, record) => {
    //     return (
    //       <>
    //         <PdfUpload
    //           patientDetail={record}
    //           handleUploadPdf={handleUploadPdf}
    //         />
    //         {record?.medicalReport && (
    //           <a href={record?.medicalReport} target='_blank'>
    //             <FilePdfOutlined
    //               style={{
    //                 fontSize: '32px',
    //                 color: '#ff0000',
    //                 marginLeft: '10%',
    //                 cursor: 'pointer',
    //               }}
    //             />
    //           </a>
    //         )}
    //       </>
    //     );
    //   },
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            type='primary'
            icon={<EyeOutlined />}
            onClick={() => handleViewAppointment(record)}
          />
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

  const handleViewAppointment = record => {
    // alert(recordId);
    console.log('record', record);
    setIsDetailModelVisible(true);
    setSelectedAppointment(record);
  };
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

      {/* Book Appointment Modal  */}
      <div
        className={`modal ${isDetailModelVisible ? 'show fade' : ''}`}
        tabIndex='-1'
        role='dialog'
        style={{
          display: isDetailModelVisible ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <div
          className='modal-dialog modal-dialog-centered'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Appointment Details</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={() => setIsDetailModelVisible(false)}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>
                <strong>Patient Name:</strong> {selectedAppointment?.fullname}
              </p>
              <p>
                <strong>Doctor Name:</strong> {selectedAppointment?.doctorFullName}
              </p>
              <p>
                <strong>Status:</strong> {selectedAppointment?.status}
              </p>
              <p>
                <strong>Doctor Contact No.: </strong>
                {selectedAppointment?.phone}
              </p>
              <p>
                <strong>Appointment Date: </strong>
                {selectedAppointment?.appointmentDate}
              </p>
              <p>
                <strong>Reason Of Appointment: </strong>
                {selectedAppointment?.reasonOfAppointment || '-'}
              </p>
              <p>
                <strong>Doctor Message: </strong>
                {selectedAppointment?.message || '-'}
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={() => setIsDetailModelVisible(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Book Appointment Modal  */}
    </Layouts>
  );
};

export default MyBookings;
