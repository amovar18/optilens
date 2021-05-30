import React from 'react';
export default function alert(props){
    return(
        <div className={"alert alert-"+props.type+" alert-dismissible fade show"}>
            <strong>{props.message}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}