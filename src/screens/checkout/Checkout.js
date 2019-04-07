import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../common/header/Header";
import AddressTabs from "./AddressTabs";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PlaceOrder from "./PlaceOrder";
import Payment from "./Payment";
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

const getSteps = () => {
    return ["Delivery", "Payment"];
};

// Checkout Component
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

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    getData = async () => {
        const getPaymentData = async () => {
            const api_call = await fetch("http://localhost:8080/api/payment");
            const data = await api_call.json();

            const paymentMethodList = [];

            console.log(data);

            data.paymentMethods.forEach(element => {
                paymentMethodList.push([element.payment_name, element.id]);
            });

            this.setState({
                payments: paymentMethodList
            });
        };

        const getStateData = async () => {
            // Get state data
            const states_api_call = await fetch("http://localhost:8080/api/states");
            console.log("started state data");
            const stateData = await states_api_call.json();
            console.log("received state data");

            console.log(stateData);

            const stateNameList = [];

            stateData.states.forEach(element => {
                stateNameList.push([element.state_name, element.id]);
            });

            console.log(stateNameList);

            this.setState({
                states: stateNameList
            });
        };

        const getAddressData = async () => {
            // Get address data
            const addresses_api_call = await fetch(
                "http://localhost:8080/api/address/customer",
                {
                    headers: {
                        authorization:
                        "Bearer " + window.sessionStorage.getItem("access-token"),
                        "content-type": "application/json;charset=UTF-8"
                    }
                }
            );

            const addressData = await addresses_api_call.json();

            console.log(addressData);

            const addressList = [];

            addressData.addresses.forEach(element => {
                addressList.push(element);
            });

            this.setState({
                addresses: addressList
            });

            console.log(this.state.addresses);
        };

        const handleRejection = func => {
            return func.catch(err => ({ error: err }));
        };

        const callAllGetRequests = async () => {
            await Promise.all(
                [getAddressData(), getStateData(), getPaymentData()].map(
                    handleRejection
                )
            );
        };

        callAllGetRequests();
    };

    handleAddressForm = async data => {
        const myData = await data;
        if (myData) {
            this.setState({
                addressFormData: data
            });
        }
        this.postData(myData);
    };

    handlePaymentMethodSelector = async data => {
        const myData = await data;
        if (myData) {
            this.setState({ paymentData: myData });
        }
        console.log(myData);
        // call post method method to place order here
    };

    handleAddressSelector = async data => {
        const myData = await data;
        this.setState({
            addressId: data
        });
        console.log(this.state.addressId);
    };

    // Method to make Http POST requests asynchronously
    postData = async data => {
        const paymentData = this.state.paymentData;
        const addressId = this.state.addressId;
        const restaurantId = this.props.location.state.restaurantId;
        const itemData = this.props.location.state.cart;

        console.log(itemData);

        let totalPrice = 0;

        itemData.forEach(element => {
            totalPrice += element[0][3];
        });

        const itemQuantities = [];

        itemData.forEach(element => {
            const finalObj = {
                item_id: element[0][2],
                price: element[0][3],
                quantity: element[1]
            };
            itemQuantities.push(finalObj);
        });

        console.log(paymentData);
        console.log(restaurantId);

        // construct final request
        const finalResponse = {
            address_id: addressId,
            bill: totalPrice,
            coupon_id: "",
            discount: 0,
            item_quantities: itemQuantities,
            payment_id: paymentData,
            restaurant_id: restaurantId
        };

        const postAddress_api_call = await fetch(
            "http://localhost:8080/api/order",
            {
                method: "POST",
                headers: {
                    authorization:
                    "Bearer " + window.sessionStorage.getItem("access-token"),
                    "content-type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(finalResponse)
            }
        );

        console.log(postAddress_api_call);

        if (postAddress_api_call.status === 201) {
            this.setState({
                snackboxMessage: "Order placed successfully!"
            });
        } else if (postAddress_api_call.status !== 201) {
            this.setState({
                snackboxMessage: "‘Unable to place your order! Please try again!’"
            });
        }
    };

    componentWillMount() {
        const sessionAccessToken = window.sessionStorage.getItem("access-token");
        this.setState({
            accessToken: sessionAccessToken
        });
        console.log(this.props.location.state.restaurant);
        this.getData();
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return (
                    <AddressTabs
                        stateList={this.state.states}
                        address={this.state.addresses}
                        action={this.handleAddressForm.bind(this)}
                        addressAction={this.handleAddressSelector.bind(this)}
                    />
                );
            case 1:
                return (
                    <Payment
                        paymentMethodsList={this.state.payments}
                        action={this.handlePaymentMethodSelector.bind(this)}
                    />
                );
            default:
                return "Uknown step";
        }
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <div style={{ display: "inline-flex" }}>
                    <div className="order-summary" onClick={this.postData}>
                        <PlaceOrder
                            className="order-summary"
                            cartData={this.props.location.state.cart}
                            restaurantName={this.props.location.state.restaurant}
                            totalPrice={this.props.location.state.totalPrice}
                            snackBoxMessage={this.state.snackboxMessage}
                        />
                    </div>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{this.getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography
                                    color="textPrimary"
                                    style={{ fontSize: "20px", fontWeight: "500" }}
                                >
                                    View the summary &amp; place your order now!
                                </Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    Change
                                </Button>
                            </Paper>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object
};

// Export
export default withStyles(styles)(Checkout);