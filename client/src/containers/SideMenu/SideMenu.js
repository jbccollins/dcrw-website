import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getRestaurantID } from "utilities/helpers";
import { setHoveredRestaurant, setFilteredRestaurants } from "actions/controls";
import ListItem from "components/ListItem";
import "./SideMenu.scss";

const NAME = "name";
const RATING = "yelpRating";
const PRICE = "priceRange";
const DISTANCE = "distance";

class SideMenu extends React.Component {
  state = {
    sort: NAME,
    desc: true
  };

  handleRestaurantMouseOver = id => {
    this.props.setHoveredRestaurant(id);
  };

  handleSort = sort => {
    this.setState({ sort });
  };

  compareRestaurants = (a, b, sort, desc) => {
    if (typeof a[sort] === "undefined" || typeof b[sort] === "undefined") {
      return 0;
    }
    if (isNaN(a[sort]) || isNaN(b[sort])) {
      return a[sort].localeCompare(b[sort]);
    } else {
      console.log("number");
      return a[sort] - b[sort];
    }
  };

  render() {
    const { restaurants, filteredRestaurants } = this.props;
    const { sort } = this.state;
    var restaurantsToMap = filteredRestaurants
      ? filteredRestaurants
      : restaurants;
    return (
      <div className="SideMenu">
        <div className="header-wrapper">
          <div className="header">
            <div
              className={`sort name${sort === NAME ? " current" : ""}`}
              onClick={() => this.handleSort(NAME)}
            >
              Name
            </div>
            <div
              className={`sort rating${sort === RATING ? " current" : ""}`}
              onClick={() => this.handleSort(RATING)}
            >
              Rating
            </div>
            <div
              className={`sort price${sort === PRICE ? " current" : ""}`}
              onClick={() => this.handleSort(PRICE)}
            >
              Price
            </div>
            <div
              className={`sort distance${sort === DISTANCE ? " current" : ""}`}
              onClick={() => this.handleSort(DISTANCE)}
            >
              Distance
            </div>
            <div className="slider" />
          </div>
        </div>
        <div className="restaurants-list">
          {restaurantsToMap &&
            restaurantsToMap
              .sort((a, b) => this.compareRestaurants(a, b, sort))
              .map(r => {
                const id = getRestaurantID(r);
                return (
                  <div
                    onMouseOver={() => this.handleRestaurantMouseOver(id)}
                    key={id}
                    className="list-item"
                  >
                    <ListItem {...r} />
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
  filteredRestaurants: state.filteredRestaurants
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setFilteredRestaurants,
      setHoveredRestaurant
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
