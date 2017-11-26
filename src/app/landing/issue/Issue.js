import React from 'react';
import ReactQuill from 'react-quill';
import EditorHeader from '../../../components/EditorHeader';
import {Tag, Input, Tooltip, Button} from 'antd';
import DocumentService from '../../../api/DocumentService';
import { browserHistory } from 'react-router';
import {ROUTES} from '../../../utils/constants';
import auth from '../../../utils/auth';

const modes = {
  view: '1',
  edit: '2',
};

class Issue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      document: {},
      inputTitleValue: '',
      editorHtml: '', // html
      tags: [],
      inputVisible: false, // tag input
      inputValue: '', // tag input
      isEditMode: this.props.location.query.mode === modes.edit,
      documentId: this.props.params.issueId,
    };
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.handleChange = this.handleChange.bind(this);
    this.displayTags = this.displayTags.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
  }

  componentDidMount() {
    console.log('did mount');
    this.setState({ mode: this.props.location.query.mode});
    this.attachQuillRefs();
    let documentId = this.props.params.issueId;
    // TODO: if param issueId
    if (documentId !== undefined) {
      DocumentService.getDocument(documentId).then(response => {
        let tagsMapped = response.tags.map(function(tag) {
          return tag.name;
        });
        this.setState({
          document: response,
          tags: tagsMapped,
          editorHtml: response.contentHtml,
        });
      });
    } else {
      console.log('new document');
    }
    this.quillRef.enable(this.state.isEditMode);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === undefined) {
      return false;
    }
    if (this.state.mode !== this.props.location.query.mode) {
      let document = this.state.document;
      let tagsMapped = document.tags.map(function(tag) {
        return tag.name;
      });
      console.log('if');
      this.setState({
        mode: this.props.location.query.mode,
        isEditMode: this.props.location.query.mode === modes.edit,
        editorHtml: document.contentHtml,
        tags: tagsMapped,
      });
      this.quillRef.enable(this.props.location.query.mode === modes.edit);
    }
  }

  saveDocument() {
    let {collectionId, issueId} = this.props.params;
    let newDocument = {
      contentHtml: this.state.editorHtml,
      contentText: this.quillRef.getText(),
      name: issueId === undefined ? this.state.inputTitleValue : this.state.document.name,
      collection_id: collectionId,
      tags: this.state.tags,
    };
    console.log('request', newDocument);
    if (issueId !== undefined) {
      DocumentService.update(newDocument, issueId).then(response => {
        console.log('saveDocument');
        this.setState({
          document: response,
        });
        browserHistory.push(`${ROUTES.COLLECTIONS}/${collectionId}${ROUTES.DOCUMENTS}/${issueId}?mode=1`);
      });
    } else {
      newDocument.token = auth.getToken();
      console.log('request', newDocument);
      DocumentService.create(newDocument).then(response => {
        this.setState({
          document: response,
          documentId: response.pk,
        });
        browserHistory.push(`${ROUTES.COLLECTIONS}/${collectionId}${ROUTES.DOCUMENTS}/${response.pk}?mode=1`);
      });
    }
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') {
      return;
    }
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleChange(html) {
    console.log('html->', html);
    if (html.length > 20) {
      this.setState({ editorHtml: html });
    }
    this.setState({ editorHtml: html });
  }

  handleTagRemoved = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    console.log('show-input');
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputTitleChange = (e) => {
    this.setState({ inputTitleValue: e.target.value });
  };

  handleInputTagChange = (e) => {
    console.log('handle input change');
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    console.log('handle input confirm');
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
    const { document, inputTextValue, inputVisible, inputValue, isEditMode, documentId } = this.state;
    const {collectionId, issueId} = this.props.params;
    return (
      <div className="text-editor">
        <EditorHeader
          isEditMode={this.state.isEditMode}
          collectionId={collectionId}
          issueId={issueId}
          saveDocument={this.saveDocument}
          creator={document.creator}
        />
        <div className="document">
          <div className="document-header">
            { documentId !== undefined ?
              <p className="title">{document.name}</p> :
              <Input
                disabled={false}
                onChange={this.handleInputTitleChange}
                placeholder={"Título..."}
                className="input-title"
              />
            }
            { documentId !== undefined && <p className="subtitle">Actualizado: {document.updated_at}</p> }
            <div className="tags-container">
              {this.displayTags()}
              {inputVisible &&  isEditMode && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputTagChange}
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
