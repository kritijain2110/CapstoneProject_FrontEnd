import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import "./AddressForm.css";
import StateSelect from "./StateSelect";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

// AddressForm component
class AddressForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        stateName: "",
        name: "hai",
        labelWidth: 0,
        stateId: "",
        flatBuilding: "",
        locality: "",
        city: "",
        pincode: ""
    };

    handleChange = name => event => {
        this.setState({
            stateId: event.target.value
        });
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () => {
        const formStates = {
            city: this.state.city,
            flat_building_name: this.state.flatBuilding,
            locality: this.state.locality,
            pincode: this.state.pincode,
            state_uuid: this.state.stateId
        };
        this.props.action(formStates);
    };

    render() {
        let that = this;
        return (
            <div className="address-form-container">
                <FormControl
                    className="address-form"
                    style={{ width: "30%", marginLeft: "10px" }}
                >
                    <Input
                        fullWidth={true}
                        onChange={event =>
                            this.setState({ flatBuilding: event.target.value })
                        }
                        placeholder="Flat / Building No.*"
                        style={{ marginTop: "25px" }}
                    />
                    <Input
                        fullWidth={true}
                        onChange={event => this.setState({ locality: event.target.value })}
                        placeholder="Locality *"
                        id="passInput"
                        style={{ marginTop: "25px" }}
                    />
                    <Input
                        fullWidth={true}
                        onChange={event => this.setState({ city: event.target.value })}
                        placeholder="City *"
                        id="passInput"
                        style={{ marginTop: "25px" }}
                    />
                    <FormControl>
                        <InputLabel
                            htmlFor="states"
                            style={{ fontWeight: "lighter", color: "grey" }}
                        >
                            State *
                        </InputLabel>
                        <div style={{ marginTop: "7.4%" }}>
                            <Select
                                fullWidth
                                value={this.state.stateName}
                                onChange={that.handleChange("stateName")}
                                placeholder="State*"
                            >
                                {this.props.stateNamesList.map(element => {
                                    return <MenuItem value={element[1]}>{element[0]}</MenuItem>;
                                })}
                            </Select>
                        </div>
                    </FormControl>
                    <Input
                        fullWidth={true}
                        placeholder="Pincode *"
                        onChange={event => this.setState({ pincode: event.target.value })}
                        id="passInput"
                        style={{ marginTop: "25px", marginBottom: "25px" }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: "70%", marginBottom: "25px" }}
                        onClick={this.handleSubmit}
                    >
                        Save Address
                    </Button>
                </FormControl>
            </div>
        );
    }
}

// Export
export default AddressForm;