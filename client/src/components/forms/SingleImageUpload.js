import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SingleImageUpload = ({ handleUploadButtonClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} upload failed.`);
    }

    // Ensure that the file type is an image
    if (file.type.startsWith('image/')) {
      // Get the latest file from the fileList
      const latestFile = fileList[fileList.length - 1];

      // Update the state with the latest file
      if (latestFile) {
        setSelectedImage(latestFile.originFileObj);
      } else {
        setSelectedImage(null);
      }
    } else {
      // Display an error message for non-image files
      message.error('Please upload only image files (JPG, JPEG, PNG).');
    }
  };

  return (
    <>
      <Upload
        name='profileImage'
        listType='picture-card'
        showUploadList={false}
        accept='.jpg,.jpeg,.png'
        beforeUpload={() => false} // Prevent default upload behavior
        onChange={handleFileChange}>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt='Profile'
            style={{ width: '100%' }}
          />
        ) : (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Button
        type='primary'
        onClick={() => {
          handleUploadButtonClick(selectedImage);
        }}
        style={{ marginTop: 16 }}>
        Upload
      </Button>
    </>
  );
};

export default SingleImageUpload;
