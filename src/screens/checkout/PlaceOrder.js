import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import OrderSnackbar from "./OrderSnackbar";

const styles = {
    card: {
        minWidth: 300
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 16
    },
    pos: {
        marginBottom: 12
    }
};

class PlaceOrder extends Component {
    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        const cartData = this.props.cartData;
        const restaurantName = this.props.restaurantName;
        const snackBoxMessage = this.props.snackBoxMessage;
        const priceArray = [];
        const totalPrice = () => priceArray.reduce((a, b) => a + b, 0);

        console.log(this.props.cartData);

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        style={{ marginBottom: "20px" }}
                    >
                        Summary
                    </Typography>
                    <Typography
                        className={classes.title}
                        gutterBottom
                        style={{ marginBottom: "10%", fontWeight: "lighter" }}
                    >
                        {restaurantName}
                    </Typography>
                    {cartData.map(element => (
                        <div>
                            <Typography className={classes.pos} color="textSecondary">
                                {element[0][4] === "VEG" ? (
                                    <i
                                        className="far fa-stop-circle"
                                        aria-hidden="true"
                                        style={{
                                            fontSize: "13px",
                                            color: "#7DC280",
                                            marginRight: "2%"
                                        }}
                                    />
                                ) : (
                                    <i
                                        className="fa fa-stop-circle"
                                        aria-hidden="true"
                                        style={{
                                            fontSize: "13px",
                                            color: "#BB3A3F",
                                            marginRight: "2%"
                                        }}
                                    />
                                )}
                                <span style={{ marginRight: "10%" }}>{element[0][1]}</span>{" "}
                                <span style={{ marginRight: "10%" }}>{element[1]}</span>{" "}
                                <span>
                  <i className="fa fa-inr" aria-hidden="true" />
                                    {element[0][3]}
                                    <span style={{ display: "none" }}>
                    {priceArray.push(element[0][3])}
                  </span>
                </span>
                            </Typography>
                        </div>
                    ))}
                    <Divider style={{ marginTop: "5%" }} />
                    <Typography className={classes.title} style={{ marginTop: "5%" }}>
                        <span style={{ marginRight: "33%" }}>Net Amount</span>{" "}
                        <span onChange={this.props.getTotal}>
              {" "}
                            <i className="fa fa-inr" aria-hidden="true" />
                            {totalPrice()}
            </span>
                    </Typography>
                </CardContent>
                <OrderSnackbar snackBoxMessage={snackBoxMessage} />
            </Card>
        );
    }
}

PlaceOrder.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlaceOrder);