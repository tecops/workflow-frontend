import React from 'react';
import { connect } from 'react-redux';
import { selectEvent, getSearchEvents } from '../../store/actions/DashBoardActions';
import {
  setSearchSuggestions,
  setSerchOverlay
} from '../../store/actions/DashBoardActions';
import './searchfield.css';
import { ListGroup, Overlay } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';


class SearchFieldComponent extends React.Component {
  constructor(props) {
    super(props);

    this.attachRef = target => this.setState({ target });
    this.state = {
      text: ''
    };
  }

  onTextChanged = e => {

    const { getSearchEvents } = this.props;
    const { items } = this.props;
    const { setSearchSuggestions, setSerchOverlay } = this.props;
    const value = e.target.value;
    let suggestions = [];
    this.setState(() => ({
      text: value
    }));
    setSerchOverlay(true);
    setSearchSuggestions(suggestions);
    if (value.length > 0) {
      getSearchEvents(value);
    }


  };

  suggestionSelected(event) {
    const { selectEvent, setSerchOverlay, onEventCalendarPress } = this.props;
    this.setState(() => ({
      text: ''
    }));
    setSerchOverlay(false);
    selectEvent(event.eventId);
    onEventCalendarPress();
  }

  renderSuggesions() {
    const { items, searchOverlay } = this.props;
    const { text } = this.state;
    if (items.length === 0 || text === '' || !searchOverlay) {
      return null;
    }
    return items.map(item => (
      <ListGroup.Item onClick={() => this.suggestionSelected(item)} className="resultItem">
        {item.eventName}
      </ListGroup.Item>
    ));
  }
  // extracted the overlay comeponent & commented :  dj 
  // renderSuggesions () {
  //   const {suggestions, target} = this.state;
  //   if (suggestions.length === 0){
  //     return null;
  //   }
  //   return (
  //     <Overlay target={target} placement="bottom" show={true}>
  //         <ul className="searchbarlist">
  //           {suggestions.map((item) => <li onClick={(() => this.suggestionSelected(item))}>{item}</li>)}
  //         </ul>
  //    </Overlay>
  //   )
  // }


  render() {
    const { text, target } = this.state;
    const { searchOverlay } = this.props;
    return (
      <div className="searchbar">
        <input
          className="form-control"
          value={text}
          onChange={this.onTextChanged}
          type="text"
          ref={this.attachRef}
        />
        <Overlay target={target} placement="bottom-start" show={searchOverlay}>
          <ListGroup variant="flush" id="searchList">{this.renderSuggesions()}</ListGroup>
        </Overlay>

        {/* <input className="form-control" value={text} onChange = {this.onTextChanged} type="text" ref={this.attachRef}></input>
        {this.renderSuggesions()} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.dashboard.events,
  suggestions: state.dashboard.searchSuggestions,
  searchOverlay: state.dashboard.searchOverlay
});
export default connect(
  mapStateToProps,
  { selectEvent, setSearchSuggestions, setSerchOverlay, getSearchEvents }
)(SearchFieldComponent);
