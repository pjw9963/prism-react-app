import "./App.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: "",
      bucket: "",
    };
    this.uploadRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.transcribeFile = this.transcribeFile.bind(this);
  }

  handleClick(e) {
    this.uploadRef.click();
  }

  onChangeFile(event) {
    this.setState({
      file: event.target.files[0],
      loaded: 0,
    });
  }

  RenderFile(props) {
    const hasFile = props.hasFile !== "";
    if (hasFile) {
      return <span className="uploaded-file">uploaded : {props.hasFile}</span>;
    }
    return <div></div>;
  }

  transcribeFile(event) {
    const data = new FormData();
    data.append("file", this.state.file);
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  }

  RenderTranscribe(props) {
    if (props.hasFile == "") {
      return (
        <Button className="transcribe" variant="secondary">
          Transcribe
        </Button>
      );
    }

    return (
      <Button
        className="transcribe"
        onClick={this.transcribeFile}
        variant="success"
      >
        Transcribe
      </Button>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="zander">Zoom Transcriber</h1>
          <div className="inputs">
            <InputGroup className="z-link">
              <InputGroup.Prepend className="prepender">
                <InputGroup.Text id="linktext">🔗</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Zoom Link"
                aria-label="Zoom Link"
                aria-describedby="linktext"
              />
            </InputGroup>
            <p className="or">or</p>
            <input
              type="file"
              id="file"
              ref={(r) => (this.uploadRef = r)}
              style={{ display: "none" }}
              onChange={this.onChangeFile.bind(this)}
            />
            <Button
              onClick={this.handleClick}
              className="upload"
              variant="secondary"
            >
              Upload .mp4 from Computer
            </Button>{" "}
            <this.RenderFile hasFile={this.state.name} />
          </div>
          <Button
            className="transcribe"
            onClick={this.transcribeFile}
            variant="success"
          >
            Transcribe
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
