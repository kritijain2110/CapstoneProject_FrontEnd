// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2
    }
});

// Snackbar component
class OrderSnackbar extends Component {
    state = {
        open: false
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const snackBoxMessage = this.props.snackBoxMessage;
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "15px", width: "90%" }}
                    onClick={this.handleClick}
                >
                    Place Order
                </Button>
                <div style={{ position: "absolute", zIndex: 1 }}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        message={<span id="message-id">{this.props.snackBoxMessage}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </div>
            </div>
        );
    }
}


OrderSnackbar.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(OrderSnackbar);