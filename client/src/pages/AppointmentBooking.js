import React, { useState, useEffect } from 'react';
import Layouts from '../components/Layouts';
import ContentHeader from '../components/ContentHeader';

const AppointmentBooking = () => {
  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Appointment Booking'
          bredCumName='Appointment Booking'
        />
        <section className='content'>
          <div className='container-fluid'></div>
        </section>
      </div>
    </Layouts>
  );
};

export default AppointmentBooking;
