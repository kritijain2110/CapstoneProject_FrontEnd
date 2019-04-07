
import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import "./RestaurantInformation.css";


class RestaurantInformation extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        details: this.props.details
    };

    render() {
        const details = this.props.details;
        const address = this.props.address;
        const categories = this.props.categories;
        return (
            <div className="details">
                <div className="flex-container-details">
                    <div className="leftDetails">
                        <img
                            className="restaurantImage"
                            src={details.photo_URL}
                            alt={details.restaurant_name}
                        />
                    </div>
                    <div className="rightDetails">
                        <div style={{ marginBottom: "2%" }}>
                            <Typography variant="h5" component="h5">
                                {details.restaurant_name}{" "}
                            </Typography>
                        </div>
                        <div style={{ marginBottom: "2%" }}>
                            <Typography variant="h6" component="h6">
                                {address.locality}
                            </Typography>
                        </div>
                        <div div style={{ marginBottom: "2%" }}>
                            <Typography variant="p" component="p">
                                {categories}
                            </Typography>
                        </div>
                        <br />
                        <div className="flex-countsContainer">
                            <div className="countElements">
                                <Typography>
                  <span className="bold">
                    <i className="fa fa-star" aria-hidden="true" />
                      {details.customer_rating}
                  </span>
                                    <br />
                                    <span className="subHeaders">
                    AVERAGE RATING BY
                    <br />
                                        {details.number_customers_rated} CUSTOMERS
                  </span>
                                </Typography>
                            </div>

                            <div className="countElements">
                                <Typography>
                  <span className="bold">
                    &#8377;&nbsp;{details.average_price}
                  </span>
                                    <br />
                                    <span className="subHeaders">
                    AVERAGE COST FOR <br />
                    TWO PEOPLE{" "}
                  </span>
                                </Typography>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

// export
export default RestaurantInformation;