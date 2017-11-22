import React from 'react';
import ReactQuill from 'react-quill';
import EditorHeader from '../../../components/EditorHeader';

class Issue extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <EditorHeader/>
        <ReactQuill
          onChange={this.handleChange}
          placeholder={'Write something...'}
          modules={Issue.modules}
          formats={Issue.formats}
          theme="snow"
        >
          <div
            key="editor"
            ref="editor"
            className="quill-contents"
          />
        </ReactQuill>
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
