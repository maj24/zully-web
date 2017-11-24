import React from 'react';
import ProblemCard from '../../../components/ProblemCard';
import { Tag } from 'antd';
import DocumentService from '../../../api/DocumentService';
import TagService from '../../../api/TagService';
const CheckableTag = Tag.CheckableTag;

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      documents: [],
      tags: [],
    };
    this.displayCards = this.displayCards.bind(this);
    this.displayTags = this.displayTags.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.fetchDocuments = this.fetchDocuments.bind(this);
  }

  componentWillMount() {
    this.setState({ collectionId: this.props.params.collectionId});
    this.fetchDocuments();
    this.fetchTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === undefined) {
      return false;
    }

    if (this.state.collectionId !== this.props.params.collectionId) {
      this.fetchDocuments();
      this.fetchTags();
      this.setState({collectionId: this.props.params.collectionId});
    }
  }

  fetchDocuments() {
    let collectionId = this.props.params.collectionId;
    DocumentService.getCollectionDocuments(collectionId).then(response => {
      console.log('documents -> ', response.documents);
      this.setState({ documents: response.documents});
    });
  }

  fetchTags() {
    let collectionId = this.props.params.collectionId;
    TagService.getCollectionTags(collectionId).then(response => {
      console.log('tags -> ', response.tags);
      this.setState({ tags: response.tags});
    });
  }

  displayCards() {
    let documents = this.state.documents;
    return documents.map((item, i) => {
      return <ProblemCard
        key={i}
        document={item}
        collectionId={this.props.params.collectionId}>
      </ProblemCard>;
    });
  }

  handleTagChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [ ...selectedTags, tag ] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  displayTags() {
    let { selectedTags, tags } = this.state;
    return tags.map(tag => {
      return <CheckableTag
        key={tag.pk}
        checked={selectedTags.indexOf(tag) > -1}
        onChange={checked => this.handleTagChange(tag, checked)}
      >
        {tag.name}
      </CheckableTag>;
    });
  }

  // TODO: Add create document button
  render() {
    return (
      <div>
        <div className={'tags-header'}>
          <strong style={{ marginRight: 8, fontSize: 14 }}>Categories:</strong>
          <div className={'tags-container'}>
            {this.displayTags()}
          </div>
        </div>
        <div>
          {this.displayCards()}
        </div>
      </div>
    );
  }
}


export default Collection;
