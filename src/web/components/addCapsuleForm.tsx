"use client";
import React, {useEffect} from "react";

const AddCapsuleForm = () => {
    const [model, setModel] = React.useState("");
    const [producer, setProducer] = React.useState("");
    const [type, setType] = React.useState("");
    const [depot, setDepot] = React.useState(1);
    // model, producent, typ, id depotu
    const [depots, setDepots] = React.useState([]);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [label, setLabel] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/depots/getDepots`);
                const data = await response.json();
                setDepots(data.data);
            } catch (error) {
                console.error("Error fetching depots:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(type);
        const response = await (await fetch(`/api/capsules/addCapsule?model=${model}&producer=${producer}&type=${type}&depot=${depot}`)).json();
        setIsDisabled(true);
        if (response.status === 200) {
            console.log(response.message);
            setLabel(response.message);
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
        } else {
            console.log("ERROR: " + response.message);
            setLabel("ERROR: " + response.message);
        }
    };

    return (
        <div>
            <h3>Add new capsule</h3>
            <form id={"add-capsule-form"} onSubmit={handleSubmit}>
                <label htmlFor="model">Model</label>
                <input required maxLength={32} type="text" id="model" onChange={(e)=>{setModel(e.target.value)}}/>
                <br/>
                <label htmlFor="producer">Producer</label>
                <input required maxLength={32} type="text" id="producer" onChange={(e)=>{setProducer(e.target.value)}}/>
                <br/>
                <label htmlFor="type">Type</label>
                <select required id="type" onChange={(e)=>{setType(e.target.value)}}>
                    <option value=""></option>
                    <option value="Passenger">Passenger</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Cargo">Cargo</option>
                </select>
                <br/>
                <label htmlFor="depot">Depot</label>
                <select required id="depot" onChange={(e)=>{setDepot(e.target.value)}}>
                    <option value=""></option>
                    {depots.map(depot => (
                        <option key={depot.depot_id} value={depot.depot_id}>
                            {depot.name}
                        </option>
                    ))}
                </select>
                <br />
                <button className={"hyperloop-item"} type={"submit"} disabled={isDisabled}>Add capsule</button>
                <br />
                <label htmlFor="add-capsule-form">{label}</label>
            </form>
        </div>
    );
}

export default AddCapsuleForm;