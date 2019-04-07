import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import "./Cart.css";

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
    }
};

class Cart extends React.Component {
    constructor() {
        super();
        this.getTotalAmount = this.getTotalAmount.bind(this);
        this.getTotalCount = this.getTotalCount.bind(this);
        this.state = {
            totalCount: 0,
            totalAmount: 0,
            itemsOnCart: {},
            itemCountOnCart: {}
        };
    }

    componentWillMount() {
        this.setState({
            itemsOnCart: this.props.itemsOnCart,
            itemCountOnCart: this.props.itemCountOnCart
        });
    }
    getTotalCount = () => {
        let itemCountOnCart = this.state.itemCountOnCart;

        let totalCount = Object.keys(itemCountOnCart).reduce((prevTotal, key) => {
            return prevTotal + itemCountOnCart[key];
        }, 0);

        if (totalCount !== "undefined") {
            this.setState({ totalCount: totalCount });
            return totalCount;
        } else {
            return this.state.totalCount;
        }
    };

    getTotalAmount = () => {
        let itemCountOnCart = this.state.itemCountOnCart;
        let itemsOnCart = this.state.itemsOnCart;

        console.log(itemsOnCart);

        let totalAmount = Object.keys(itemsOnCart).reduce((prevTotal, key) => {
            let itemCount = itemCountOnCart[key];
            return prevTotal + itemCount * itemsOnCart[key].price;
        }, 0);
        if (totalAmount !== "undefined") {
            this.setState({ totalAmount: totalAmount });
            console.log(this.state.totalAmount);
            return totalAmount;
        } else {
            return this.state.totalAmount;
        }
    };

    render() {
        const { classes } = this.props;
        const items = this.props.items;
        const priceArray = [];
        const total = () => priceArray.reduce((a, b) => a + b, 0);
        return (
            <Card className={classes.card}>
                <CardContent onChange>
          <span style={{ fontWeight: "bold", color: "black" }}>
            <Badge showZero color="primary" classes={{ badge: classes.badge }}>
              <ShoppingCartIcon style={{ color: "black" }} />
            </Badge>
            My Cart
          </span>
                    <div>
                        <div>
                            {items.map(item => {
                                return (
                                    <div key={item[0][1]}>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {item[0][4] === "VEG" ? (
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
                                            <span style={{ marginRight: "5%" }}>{item[0][1]}</span>{" "}
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => this.props.addItem(item)}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <span>{item[1]}</span>
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => this.props.addItem(item)}
                                                style={{ marginRight: "10%" }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                            <span>
                        <i className="fa fa-inr" aria-hidden="true" />
                                                {item[0][3]}
                                                {console.log(priceArray.push(item[0][3]))}
                      </span>
                                        </Typography>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Typography className={classes.title} style={{ marginTop: "10px" }}>
            <span style={{ fontWeight: "bold", fontSize: "smaller" }}>
              TOTAL AMOUNT
            </span>
                        <i
                            className="fa fa-inr"
                            aria-hidden="true"
                            style={{ marginLeft: "40%" }}
                        />
                        {total()}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginBottom: "2%", marginTop: "5%" }}
                        onClick={this.handleClick}
                    >
                        Checkout
                    </Button>
                </CardContent>
            </Card>
        );
    }
}
export default withStyles(styles)(Cart);