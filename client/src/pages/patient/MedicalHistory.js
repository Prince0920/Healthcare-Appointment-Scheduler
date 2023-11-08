import React from 'react';

const MedicalHistory = ({
  medicalHistory,
  medicalHistoryErrors,
  handleMedicalHistoryChange,
  deleteMedicalHistory,
  addMedicalHistory,
}) => {
  return (
    <>
      <h4 className='text-primary font-weight-bold mb-3'>Medical History</h4>
      {medicalHistory.map((history, index) => (
        <div
          key={index}
          className='border p-3 mb-3 medical-history-entry'>
          <div className='row'>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor={`condition_${index}`}>Medical Condition</label>
                <input
                  type='text'
                  className='form-control'
                  id={`condition_${index}`}
                  name={`condition_${index}`}
                  value={history.condition}
                  onChange={e => handleMedicalHistoryChange(index, 'condition', e.target.value)}
                  placeholder='Medical Condition'
                />
                {medicalHistoryErrors[index] && medicalHistoryErrors[index].condition && (
                  <span className='error-text'>{medicalHistoryErrors[index].condition}</span>
                )}
              </div>
            </div>
            <div className='col'>
              <div className='form-group'>
                <label htmlFor={`diagnosisDate_${index}`}>Diagnosis Date</label>
                <input
                  type='date'
                  className='form-control'
                  id={`diagnosisDate_${index}`}
                  name={`diagnosisDate_${index}`}
                  value={history.diagnosisDate}
                  onChange={e => handleMedicalHistoryChange(index, 'diagnosisDate', e.target.value)}
                  placeholder='Diagnosis Date'
                />
                {medicalHistoryErrors[index] && medicalHistoryErrors[index].diagnosisDate && (
                  <span className='error-text'>{medicalHistoryErrors[index].diagnosisDate}</span>
                )}
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor={`treatment_${index}`}>Treatment</label>
            <textarea
              className='form-control'
              id={`treatment_${index}`}
              name={`treatment_${index}`}
              rows='4'
              placeholder='Treatment'
              value={history.treatment}
              onChange={e =>
                handleMedicalHistoryChange(index, 'treatment', e.target.value)
              }></textarea>
            {medicalHistoryErrors[index] && medicalHistoryErrors[index].treatment && (
              <span className='error-text'>{medicalHistoryErrors[index].treatment}</span>
            )}
          </div>
          <button
            type='button'
            className='btn btn-danger mh-delete-button'
            onClick={() => deleteMedicalHistory(index)}>
            <i className='fas fa-trash-alt'></i>
          </button>
        </div>
      ))}
      <div className='float-right'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={addMedicalHistory}>
          + Add Medical History
        </button>
      </div>
    </>
  );
};

export default MedicalHistory;
