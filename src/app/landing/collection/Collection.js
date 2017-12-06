import React from 'react';
import { browserHistory } from 'react-router';
import DocumentService from '../../../api/DocumentService';
import TagService from '../../../api/TagService';
import {ROUTES} from '../../../utils/constants';
import auth from '../../../utils/auth';
import { Button, Spin, Col, Row } from 'antd';
import _ from 'lodash';
import CollectionCards from '../../../components/CollectionCards';
import emptyCollectionImage from './../../../assets/images/documents-art.png';


class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      documents: [],
      tags: [],
      collections: [],
      loading: false,
      empty: false,
    };
    this.fetchDocuments = this.fetchDocuments.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
  }

  componentWillMount() {
    this.setState({
      collectionId: this.props.params.collectionId,
      query: this.props.location.query.query,
    });
    this.fetchDocuments();
    this.fetchTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === undefined) {
      return false;
    }

    if (this.state.collectionId !== this.props.params.collectionId ||
      this.state.query !== this.props.location.query.query) {
      this.fetchDocuments();
      this.fetchTags();
      this.setState({
        collectionId: this.props.params.collectionId,
        query: this.props.location.query.query,
      });
    }
  }

  fetchDocuments() {
    this.setState({loading: true});
    let collectionId = this.props.params.collectionId;
    if (collectionId !== undefined) {
      DocumentService.getCollectionDocuments(collectionId).then(response => {
        let item = {
          collection: {
            pk: collectionId,
          },
          documents: response.documents,
        };
        let collections = [ item ];
        this.setState({
          documents: response.documents,
          collections,
          loading: false,
          empty: response.documents.length === 0,
        });
      }).catch(e => {
        this.setState({loading: false});
      });
    } else {
      let teamId = auth.getTeam();
      let query = this.props.location.query.query;
      DocumentService.search(teamId, query).then(response => {
        this.setState({
          collections: response.result,
          tags: [],
          loading: false,
          empty: false,
        });
      }).catch(e => {
        this.setState({loading: false});
      });
    }
  }

  fetchTags() {
    let collectionId = this.props.params.collectionId;
    if (collectionId !== undefined) {
      TagService.getCollectionTags(collectionId).then(response => {
        let tagsMapped = response.tags.map(function(tag) {
          return tag.name;
        });
        tagsMapped = _.uniq(tagsMapped);
        this.setState({tags: tagsMapped});
      });
    }
  }

  displayCollections() {
    let collections = this.state.collections;
    return collections.map((item, i) => {
      if (item.documents.length > 0) {
        return <CollectionCards
          key={i}
          documents={item.documents}
          collection={item.collection}
          tags={this.state.tags} >
        </CollectionCards>;
      }
    });
  }

  handleClickCreate() {
    browserHistory.push(`${ROUTES.COLLECTIONS}/${this.props.params.collectionId}${ROUTES.DOCUMENTS}?mode=2`);
  }

  render() {
    const collectionId = this.props.params.collectionId;
    const { loading, empty } = this.state;
    return (
      <div>
        { loading &&
          <div className="spin center-all">
            <Spin/>
          </div>
        }
        { empty && !loading &&
        <div className="center-all">
          <img src={emptyCollectionImage}/>
          <p className="text-empty">Esta colección está vacía</p>
          <p className="text-sub">Si encontraste la solución a una problemática ¡Documéntala! Es fácil</p>

          <div className="add-btn-empty">
            <Button onClick={this.handleClickCreate}>
              Crear documento
            </Button>
          </div>
        </div>
        }
        { !loading &&
          <div>
            { collectionId === undefined &&
            <div className="search-by">
              <p>Resultados para: </p>
              <p className="query">"{this.state.query}"</p>
            </div> }
            { this.displayCollections() }
            { collectionId !== undefined && !empty &&
            <div className="floating-btn">
              <Button onClick={this.handleClickCreate} type="primary" shape="circle" icon="plus" size={'large'} />
            </div> }
          </div>
        }
      </div>
    );
  }
}


export default Collection;
