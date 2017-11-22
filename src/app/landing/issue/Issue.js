import React from 'react';
import ReactQuill from 'react-quill';
import EditorHeader from '../../../components/EditorHeader';
import {Tag, Input, Tooltip, Button} from 'antd';

const dummyIssue = {
  title: 'Arquitecura MVP',
  html: '<p><strong>Quill Rich Text Editor</strong></p><p><br></p><p>Quill is a free, open source WYSIWYG editor built for the modern web. With its extensible architecture and a expressive API you can completely customize it to fulfill your needs. Some built in features include:</p><p><br></p><p>\t- Fast and lightweight</p><p>\t- Semantic markup</p><p>\t- Standardized HTML between browsers</p><p>\t- Cross browser support including Chrome, Firefox, Safari, and IE 9+</p><p><br></p><p><strong>Downloads</strong></p><p><br></p><p>\t- Quill.js, the free, open source WYSIWYG editor</p><p>\t- React-quill, a React component that wraps Quill.js</p>',
};

class Issue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      tags: [ 'Tag 1', 'Tag 2' ],
      inputVisible: false,
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleChange(dummyIssue.html);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(html);
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [ ...tags, inputValue ];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => this.input = input;


  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div className="text-editor">
        <EditorHeader/>
        <div className="document">
          <div className="document-header">
            <p className="title">Arquitectura MVP</p>
            <p className="subtitle">Actualizado: 13/11/2017</p>
            <div className="tags-container">
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} color="#0f8ee9" closable={true} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
          </div>
          <div className="separator"/>
          <ReactQuill
            onChange={this.handleChange}
            placeholder={'Write something...'}
            modules={Issue.modules}
            formats={Issue.formats}
            theme="snow"
            value={this.state.editorHtml}
          >
            <div
              key="editor"
              ref="editor"
              className="quill-contents"
            />
          </ReactQuill>
        </div>
      </div>
    );
  }
}

export default Issue;

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Issue.modules = {
  toolbar: {
    container: '#toolbar',
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Issue.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
];
