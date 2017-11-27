import React from 'react';
import { Tag } from 'antd';
import ProblemCard from '../components/ProblemCard';
const CheckableTag = Tag.CheckableTag;


class CollectionCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      tags: [],
    };
    this.displayTags = this.displayTags.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  displayCards() {
    let documents = this.props.documents;
    return documents.map((item, i) => {
      return <ProblemCard
        key={i}
        document={item}
        collectionId={this.props.collection.pk}>
      </ProblemCard>;
    });
  }

  handleTagChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [ ...selectedTags, tag ] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  displayTags() {
    let { selectedTags } = this.state;
    let { tags } = this.props;
    return tags.map((tag, index) => {
      return <CheckableTag
        key={index}
        checked={selectedTags.indexOf(tag) > -1}
        onChange={checked => this.handleTagChange(tag, checked)}
      >
        {tag}
      </CheckableTag>;
    });
  }

  render() {
    const {tags, collection} = this.props;
    return (
      <div>
        {
          collection.name !== undefined &&
            <div className="collection-name">
              <p>{collection.name}</p>
            </div>
        }
        <div className={'tags-header'}>
          { tags.length > 0 && <strong style={{ marginRight: 8, fontSize: 14, color: '#000000' }}>Etiquetas:</strong>}
          <div className={'tags-container'}>
            {this.displayTags()}
          </div>
        </div>
        <div className="row">
          {this.displayCards()}
        </div>
      </div>
    );
  }
}

export default CollectionCards;
