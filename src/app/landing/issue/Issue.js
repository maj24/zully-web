import React from 'react';
import ReactQuill from 'react-quill';
import EditorHeader from '../../../components/EditorHeader';
import {Tag, Input, Tooltip, Button} from 'antd';
import DocumentService from '../../../api/DocumentService';

const modes = {
  view: '1',
  edit: '2',
};

class Issue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      document: {},
      editorHtml: '', // html
      tags: [],
      inputVisible: false, // tag input
      inputValue: '', // tag input
      isEditMode: this.props.location.query.mode === modes.edit,
    };
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.handleChange = this.handleChange.bind(this);
    this.displayTags = this.displayTags.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
    let documentId = this.props.params.issueId;
    DocumentService.getDocument(documentId).then(response => {
      let tagsMapped = response.tags.map(function(tag) {
        return tag.name;
      });
      this.setState({
        document: response,
        tags: tagsMapped,
        editorHtml: response.content,
      });
    });
    this.quillRef.enable(this.state.isEditMode);
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') {
      return;
    }
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleChange(html) {
    this.setState({ editorHtml: html });
    console.log(html);
  }

  handleTagRemoved = (removedTag) => {
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

  displayTags() {
    let {tags, isEditMode} = this.state;
    return tags.map((tag, index) => {
      const isLongTag = tag.length > 20;
      const tagElem = (
        <Tag key={index} color="#0f8ee9" closable={isEditMode} afterClose={() => this.handleTagRemoved(tag)}>
          {isLongTag ? `${tag.slice(0, 15)}...` : tag}
        </Tag>
      );
      return isLongTag ? <Tooltip title={tag} key={index}>{tagElem}</Tooltip> : tagElem;
    });
  }

  saveInputRef = input => this.input = input;


  render() {
    const { document, inputVisible, inputValue, isEditMode } = this.state;
    return (
      <div className="text-editor">
        <EditorHeader isEditMode={this.state.isEditMode}/>
        <div className="document">
          <div className="document-header">
            <p className="title">{document.name}</p>
            <p className="subtitle">Actualizado: {document.updated_at}</p>
            <div className="tags-container">
              {this.displayTags()}
              {inputVisible &&  isEditMode && (
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
              {isEditMode && !inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
          </div>
          <div className="separator"/>
          <ReactQuill
            ref={(el) => { this.reactQuillRef = el; }}
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
  'header', 'align', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color', 'video', 'code-block',
];
