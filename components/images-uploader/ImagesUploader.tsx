import { Box, Fab } from '@material-ui/core';
import React from 'react';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ImageUploaded from './ImageUploaded';

interface Props {
  images: string[];
  disabled: boolean;
  handleRemoveImage: (image: string) => void;
  handleAddImage: (event: Event) => void;
}

function ImagesUploader({
  images, disabled, handleRemoveImage, handleAddImage,
} : Props): React.ReactElement {
  const renderUploadedImages = (): React.ReactElement[] => images.map(
    (image: string): React.ReactElement => (
      <ImageUploaded
        key={image}
        image={image}
        handleRemoveImage={handleRemoveImage}
      />
    ),

  );

  return (
    <Box>
      <Box display="flex" flexWrap="wrap">
        {renderUploadedImages()}
      </Box>
      <Box>
        <label htmlFor="images-picker">
          <Fab component="span" color="primary" disabled={disabled}>
            <AddPhotoAlternateIcon />
          </Fab>
          <input
            accept="image/*"
            id="images-picker"
            type="file"
            disabled={disabled}
            hidden
            onChange={handleAddImage}
          />
        </label>
      </Box>
    </Box>
  );
}

export default ImagesUploader;
