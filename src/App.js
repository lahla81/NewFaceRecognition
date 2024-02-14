// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

function App() {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value)
  } 



  const onButtonSubmit = () => {
    console.log('click')
    
    const PAT = '62ce24b3ee0f4fd7afde4f2834c170b4';
    const USER_ID = 'lahla81';
    const APP_ID = 'Face-Detecton81';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL

                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {

            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
                // Accessing and rounding the bounding box values
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach(concept => {
                    // Accessing and rounding the concept value
                    const name = concept.name;
                    const value = concept.value.toFixed(4);

                    console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                    
                });
            });

        })
        .catch(error => console.log('error', error));    
    }

  return (
    <div className="App">
      <Navigation logo={'logo'} />
      <Navigation logo={'lahla'} />
      <ImageLinkForm 
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition />
    </div>
  );
}

export default App;
