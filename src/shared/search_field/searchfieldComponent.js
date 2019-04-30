import React from 'react';
import { connect } from 'react-redux';
import {
  selectEvent,
  setSearchSuggestions,
  setSerchOverlay
} from '../../store/actions/DashBoardActions';
import './searchfield.css';
import { ListGroup } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

class SearchFieldComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  onTextChanged = e => {
    const { items } = this.props;
    const { setSearchSuggestions, setSerchOverlay } = this.props;
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.filter(v => regex.test(v.eventName));
    }
    this.setState({
      text: value
    });
    setSerchOverlay(true);
    setSearchSuggestions(suggestions);
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
    const { suggestions, searchOverlay } = this.props;
    if (suggestions === null) {
      return null;
    }
    if (searchOverlay) {
      return suggestions.map(item => (
        <ListGroup.Item
          onClick={() => this.suggestionSelected(item)}
          className="resultItem"
        >
          {item.eventName}
        </ListGroup.Item>
      ));
    }
    else {
      return null;
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div className="searchbar">
        <input
          className="form-control"
          value={text}
          onChange={this.onTextChanged}
          type="text"
        />
        <ListGroup variant="flush">{this.renderSuggesions()}</ListGroup>
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
  { selectEvent, setSearchSuggestions, setSerchOverlay }
)(SearchFieldComponent);
