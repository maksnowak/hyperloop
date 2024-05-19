"use client";
import React from "react";

export default function RepairActionButton({ capsule_id, status }: any) {
    const [text, setText] = React.useState(status === "Under repair" ? "End repair" : "Start repair");
    const [label, setLabel] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const handleClicked = async () => {
        const response = await (await fetch(`/api/repairs/performRepair?capsule_id=${capsule_id}&status=${status}`)).json();
        setIsDisabled(true);
        if (response.status == 200) {
            console.log(response.message);
            setLabel(response.message);
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
        } else {
            console.log("ERROR: " + response.message);
            setLabel("ERROR: " + response.message);
        }
    }

    return (
        <div>
            <button
                className="hyperloop-item w-1/5"
                onClick={handleClicked}
                disabled={isDisabled}
                id="repair-action-button"
            >{text}</button>
            <br></br>
            <label htmlFor="repair-action-button">{label}</label>
        </div>
    )
}


