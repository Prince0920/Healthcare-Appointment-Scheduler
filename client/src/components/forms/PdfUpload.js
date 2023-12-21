import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { FilePdfOutlined, UploadOutlined } from '@ant-design/icons';

const PDFUpload = ({patientDetail, handleUploadPdf}) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const handleFileChange = info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Ensure that the file type is a PDF
    if (info.file.type === 'application/pdf') {
      // Get the latest file from the fileList
      const latestFile = info.fileList[info.fileList.length - 1];

      // Update the state with the latest PDF file
      if (latestFile) {
        setSelectedPdf(latestFile.originFileObj);
        handleUploadPdf(latestFile.originFileObj, patientDetail._id)
      } else {
        setSelectedPdf(null);
      }
    } else {
      // Display an error message for non-PDF files
      message.error('Please upload only PDF files.');
    }
  };

  return (
    <Upload
      name='profilePdf'
      showUploadList={false}
      accept='.pdf'
      beforeUpload={() => false} // Prevent default upload behavior
      onChange={handleFileChange}>
      <UploadOutlined />
    </Upload>
  );
};

export default PDFUpload;
