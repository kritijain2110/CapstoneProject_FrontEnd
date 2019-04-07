import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Details.css";


// component
class Details extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        restaurantDetails: {},
        addressDetails: {},
        categories: [],
        categoriesArr: [],
        finalCategoryList: [],
        itemCountOnCart: 0,
        itemCartList: [],
        restaurantId: "",
        restaurantName: "",
        totalPrice: null
    };
}
export default withRouter(Details);