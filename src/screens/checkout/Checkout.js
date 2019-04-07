import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../common/header/Header";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import "./Checkout.css";

const styles = theme => ({
    root: {
        width: "74%",
        marginTop: "5px",
        position: "fixed"
    },
    summary: {
        width: "20%"
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2
    },
    resetContainer: {
        padding: theme.spacing.unit * 3
    }
});

class Checkout extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        activeStep: 0,
        payments: [],
        states: [],
        addresses: [],
        addressFormData: "",
        paymentData: "",
        addressId: "",
        accessToken: "",
        total: 0,
        snackboxMessage: ""
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    };

}

export default withStyles(styles)(Checkout);