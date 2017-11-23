import React from 'react';
import ProblemCard from '../../../components/ProblemCard';
import { Tag } from 'antd';
import CollectionService from '../../../api/CollectionService';
const CheckableTag = Tag.CheckableTag;

const cardItems = [
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
  {name: 'Arquitectura MVP', text: 'Lorem ipsum lorem ipsum lorem lor ipsumlorem ipsumlorem ipsum asd ipsumlorem ipsumlorem asd asd asd ipsumipsumlorem ipsumlorem asd ipsumipsumlorem ipsumlorem ips'},
];
const teamId = 1;

const tags = [ 'Tag1', 'Tag2', 'Tag3', 'Tag4' ];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      selectedTags: [],
    };
  }

  componentDidMount() {
    CollectionService.getTeamCollections(teamId).then(response => {
      console.log(response);
      this.setState({ collections: response.collections });
    });
  }

  displayCards() {
    return cardItems.map((item, i) => {
      return <ProblemCard key={i}>
      </ProblemCard>;
    });
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [ ...selectedTags, tag ] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  displayTags() {
    let { selectedTags } = this.state;
    return tags.map(tag => {
      return <CheckableTag
        key={tag}
        checked={selectedTags.indexOf(tag) > -1}
        onChange={checked => this.handleChange(tag, checked)}
      >
        {tag}
      </CheckableTag>;
    });
  }

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


export default Home;
