import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import RemoteSources from '@uppy/remote-sources';
import Webcam from '@uppy/webcam';
import ScreenCapture from '@uppy/screen-capture';
import GoldenRetriever from '@uppy/golden-retriever';
import Tus from '@uppy/tus';
import AwsS3 from '@uppy/aws-s3';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import XHRUpload from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import DropTarget from '@uppy/drop-target';
import Audio from '@uppy/audio';
import Compressor from '@uppy/compressor';
import './app.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/audio/dist/style.css';
import '@uppy/screen-capture/dist/style.css';
import '@uppy/image-editor/dist/style.css';

const UPLOADER = 'tus';
const COMPANION_URL = 'http://companion.uppy.io';
const TUS_ENDPOINT = 'https://tusd.tusdemo.net/files/';

const uppyDashboard = new Uppy({ debug: true })
  .use(Dashboard, {
    inline: true,
    target: '#app',
    showProgressDetails: true,
    proudlyDisplayPoweredByUppy: true,
  })
  .use(RemoteSources, {
    companionUrl: COMPANION_URL,
    sources: [],
  })

  // .use(ScreenCapture, { target: Dashboard })
  // .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, {
    target: document.body,
  });
// .use(Compressor);

// Switch for file upload methods
if (UPLOADER === 'tus') {
  uppyDashboard.use(Tus, { endpoint: TUS_ENDPOINT, limit: 6 });
}

// Function to remove specified classes
const removeClasses = () => {
  const dashboard = document.querySelector('.uppy-Dashboard');
  if (dashboard) {
    console.log('Removing classes from the dashboard:', dashboard);
    // dashboard.classList.remove('uppy-Dashboard--animateOpenClose');
    dashboard.classList.remove('uppy-size--md');
    dashboard.classList.remove('uppy-size--lg');
    dashboard.classList.remove('uppy-size--height-md');
    // dashboard.classList.remove('uppy-Dashboard--isInnerWrapVisible');
  } else {
    console.warn('Dashboard element not found');
  }
};

// Listen for the 'file-added' event
uppyDashboard.on('file-added', (file) => {
  console.log('File added:', file);
  removeClasses();
});

// Listen for window resize event
window.addEventListener('resize', () => {
  console.log('Window resized');
  removeClasses();
});

// Complete upload listener
uppyDashboard.on('complete', (result) => {
  if (result.failed.length === 0) {
    console.log('Upload successful!');
  } else {
    console.warn('Upload failed');
  }
  console.log('Successful files:', result.successful);
  console.log('Failed files:', result.failed);
});

// Make the uppy instance globally accessible (for debugging if needed)
window.uppy = uppyDashboard;
