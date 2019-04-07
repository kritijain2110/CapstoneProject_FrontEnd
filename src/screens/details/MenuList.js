// imports
import React, { Component, Fragment } from "react";
import "./MenuList.css";
import { Typography, DialogContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

// component
class MenuList extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd() {
        this.props.addItem();
    }

    render() {
        const details = this.props.details;
        const categories = this.props.categories;
        const categoriesArr = this.props.categoriesArr;
        const items = this.props.items;
        return (
            <div>
                <Fragment key={"Menu"}>
                    <Typography
                        variant="subtitle2"
                        style={{
                            textTransform: "uppercase",
                            paddingLeft: "15px",
                            fontSize: "12px"
                        }}
                    >
                        Menu
                    </Typography>
                    <Divider
                        style={{
                            paddingLeft: "15px",
                            paddingRight: "15px"
                        }}
                    />
                    <ul style={{ listStyle: "none" }}>
                        {items.map(item => {
                            return (
                                <li id={item[1]}>
                                    <div className="flex-itemDetailsContainer">
                                        <div className="flex-itemDetails">
                                            {item[4] === "VEG" ? (
                                                <i
                                                    className="fa fa-circle column"
                                                    aria-hidden="true"
                                                    style={{ fontSize: "20px", color: "#7DC280" }}
                                                />
                                            ) : (
                                                <i
                                                    className="fa fa-circle column"
                                                    aria-hidden="true"
                                                    style={{ fontSize: "20px", color: "#BB3A3F" }}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="flex-itemDetails"
                                            style={{ fontSize: "13px" }}
                                        >
                                            <span>{item[1]}</span>
                                        </div>
                                        <div
                                            className="flex-itemDetails"
                                            style={{ fontSize: "15px" }}
                                        >
                      <span>
                        <i className="fa fa-inr" aria-hidden="true" />
                          {item[3]}
                      </span>
                                        </div>
                                        <div className="flex-itemDetails">
                                            <IconButton
                                                className="column"
                                                aria-label="Add"
                                                onClick={() => this.props.addItem(item)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Fragment>
            </div>
        );
    }
}

// export
export default MenuList;