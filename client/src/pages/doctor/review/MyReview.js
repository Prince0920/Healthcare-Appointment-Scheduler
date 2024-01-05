import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import ContentHeader from '../../../components/ContentHeader';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../config/config.local';
import Spinner from '../../../components/Spinner';

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyReviews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(SERVER_BASE_URL + '/api/v1/doctor/my-review', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status == 200) {
        setIsLoading(false);
        const reviewData = response.data.data;
        setReviews(reviewData || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Your Reviews'
          bredCumName='Your Reviews'
        />
        <section className='content'>
          <div className='container-fluid'>
            {isLoading ? (
              <Spinner />
            ) : reviews.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {reviews.map(review => (
                  <li
                    key={review._id}
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      padding: '20px',
                      marginBottom: '20px',
                      background: 'white',
                    }}>
                    <div
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                      }}>{`Rating: ${review?.review?.rating}`}</div>
                    <div
                      style={{
                        marginBottom: '15px',
                        fontSize: '1.2rem',
                        color: '#555',
                      }}>{`Feedback: ${review?.review?.feedback}`}</div>
                    <div
                      style={{
                        fontSize: '1.1rem',
                        color: '#777',
                      }}>{`By: ${review?.patientName}`}</div>
                    {/* Add other relevant fields you want to display */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default MyReview;
