// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";


const TabContainer = props => {
    return (
        <Typography
            component="div"
            style={{ padding: 4 * 5, display: "inline-flex" }}
        >
            {props.children}
        </Typography>
    );
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

// AddressTabs component
class AddressTabs extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const states = this.props.stateList;
        const addresses = this.props.address;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Existing Address" />
                        <Tab label="New Address" />
                    </Tabs>
                </AppBar>
                {value === 0 && (
                    <div>
                        {addresses.map(element => (
                            <TabContainer className="tab-container">
                                {" "}
                                <AddressCard
                                    addressList={element}
                                    addressAction={this.props.addressAction}
                                />
                            </TabContainer>
                        ))}
                    </div>
                )}
                {value === 1 && (
                    <div>
                        <AddressForm stateNamesList={states} action={this.props.action} />
                    </div>
                )}
            </div>
        );
    }
}

AddressTabs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddressTabs);