import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined, FilePdfOutlined, FileImageOutlined } from '@ant-design/icons';

const MultipleImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }

    // Ensure that the file type is an image or PDF
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      // Get the latest file from the fileList
      const latestFile = fileList[fileList.length - 1];

      // Update the state with the latest files
      if (latestFile) {
        setSelectedImages(fileList.map((file) => file.originFileObj));
      } else {
        setSelectedImages([]);
      }
    } else {
      // Display an error message for non-image/PDF files
      message.error('Please upload only image files (JPG, JPEG, PNG) or PDF files.');
    }
  };

  return (
    <Upload
      name='profileFiles'
      listType='picture-card'
      fileList={selectedImages.map((file, index) => ({
        uid: index,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      }))}
      showUploadList={{ showDownloadIcon: false }}
      beforeUpload={() => false} // Prevent default upload behavior
      onChange={handleFileChange}
      multiple
      accept='.jpg,.jpeg,.png,.pdf'
    >
      {selectedImages.length > 0 ? (
        selectedImages.map((file, index) => (
          <div key={index}>
             <img
                src={URL.createObjectURL(file)}
                alt={`Profile ${index + 1}`}
                style={{ width: '100%' }}
              />
          </div>
        ))
      ) : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default MultipleImageUpload;
