
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    }
});

// Payment component
class Payment extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: "payment",
        payments: []
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.props.action(event.target.value);
    };

    render() {
        const { classes } = this.props;
        const paymentMethods = this.props.paymentMethodsList;
        const radio = <Radio />;
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select Mode of Payment</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="payments"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {paymentMethods.map(element => (
                            <FormControlLabel
                                value={element[1]}
                                control={radio}
                                label={element[0]}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

Payment.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Payment);