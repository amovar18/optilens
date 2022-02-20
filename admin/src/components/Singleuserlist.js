import React from 'react';
import {useDispatch} from 'react-redux';
function Singleuserlist(props,actionTodDo){
    const {data}=props;
    const dispatch =  useDispatch();
    if(data){
        return(
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Performable Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(({name,username,active,_id})=>(
                    <tr key={_id}>
                        <td>{_id}</td>
                        <td>{name}</td>
                        <td>{username}</td>
                        <td>{active === 1 ? <button type="button" class="btn btn-primary" onClick={dispatch(actionTodDo('activate', _id))}>Activate</button> : <button type="button" class="btn btn-danger" onClick={dispatch(actionTodDo('activate', _id))}>Deactivate</button>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }else{
        return(<h3>Error fetching data from server</h3>);
    }
}
export default Singleuserlist;