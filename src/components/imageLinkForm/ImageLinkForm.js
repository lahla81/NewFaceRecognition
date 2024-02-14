import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './imagLinkForm.css';
function ImageLinkForm({onInputChange, onButtonSubmit}) {
  return (
    <div>
      <p>
        {'this magik brain will detect faces in your picture, git it now'}
      </p>
      <div className="bgcolor w-50 mx-auto shadow-sm p-3 rounded">
        <InputGroup className="mb-0">
          <Form.Control
            placeholder="Image link"
            aria-label="Image link"
            aria-describedby="basic-addon2"
            onChange={onInputChange}
          />
          <Button 
            className="bg-white detectBtn" 
            variant="outline-secondary" 
            id="button-addon2"
            onClick={onButtonSubmit}
            >
            Detect
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default ImageLinkForm;