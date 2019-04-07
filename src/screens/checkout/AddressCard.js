import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import "./AddressCard.css";

const styles = {
    card: {
        width: "100%"
    },
    cardDisabled: {
        width: "100%",
        boxShadow: "none"
    },
    cardActionActive: {
        display: "block",
        textAlign: "initial",
        border: "solid 1px red"
    },
    cardAction: {
        display: "block",
        textAlign: "initial"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 10
    },
    pos: {
        marginBottom: 12
    }
};

// AddressCard component
class AddressCard extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        active: false
    };

    handleCardClick = event => {
        this.setState({
            active: true
        });
        this.props.addressAction(this.props.addressList.id);
    };

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        const addresses = this.props.addressList;
        return (
            <Card className={this.state.active ? classes.card : classes.cardDisabled}>
                <ButtonBase
                    className={
                        this.state.active
                            ? this.props.classes.cardActionActive
                            : this.props.classes.cardAction
                    }
                    onClick={this.handleCardClick}
                >
                    <CardContent>
                        <Typography component="p" style={{ marginBottom: "5px" }}>
                            {addresses.flat_building_name}
                        </Typography>
                        <Typography component="p" style={{ marginBottom: "5px" }}>
                            {addresses.locality}
                        </Typography>
                        <Typography component="p" style={{ marginBottom: "5px" }}>
                            {addresses.city}
                        </Typography>
                        <Typography component="p" style={{ marginBottom: "5px" }}>
                            {addresses.state.state_name}
                        </Typography>
                        <Typography component="p" style={{ marginBottom: "5px" }}>
                            {addresses.pincode}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <CheckCircle
                            className={
                                this.state.active ? "btn-check-active" : "btn-check-disabled"
                            }
                            style={{ marginLeft: "80%" }}
                        />
                    </CardActions>
                </ButtonBase>
            </Card>
        );
    }
}

AddressCard.propTypes = {
    classes: PropTypes.object.isRequired
};

// Export
export default withStyles(styles)(AddressCard);